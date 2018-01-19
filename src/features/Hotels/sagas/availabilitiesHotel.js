// ***********************************
// TODO remove when refacto finished
const mockAvailabilitiesResortPayload = {
  resortIdList: ['FRA40267', 'FRA42193', 'FRA23316'], specialCodeValue: '', specialCodeType: '', roomOccupancyList: [{ adult: '1', child: '0' }], numberOfRooms: 1, numberOfAdults: 1, numberOfChildren: 0, startDate: '2018-01-16T00:00:00', endDate: '2018-01-17T00:00:00', locale: 'en-us',
}
// **********************************

import { call, select, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import _ from 'lodash'

/**
 * Core
 */
import request from 'core/utils/request'
import { getLocaleLanguage } from 'core/utils/languages'
import { Api } from 'core/utils/api'
import { URLQueryBuilder, mergeHotels } from 'core/utils/functions'

/**
 * Actions
 */
import {
  setQuerySearch,
  requestAvailabilities,
  requestAvailabilitiesSuccess,
  requestGeolocSearchSuccess,
  requestSearchError,
} from '../actions'

import {
  errorAction,
  setAvailableDisplayApp,
} from 'core/actions'

/**
 * Selectors
 */
import {
  getInitValues,
  getHotels,
} from '../selectors'

/**
 * Types
 */
import {
  jsonToRoomSearch,
  jsonToHotels,
  jsonToLocation,
} from '../types'

/**
 * Constants
 */
import {
  REQUEST_GEOLOC_SEARCH,
} from '../constants'

/**
 * Get resort availabilities according to the searched payload with the lighter API
 * @param {object} payload Params from URL query
 * @param {*} resorts Array of selected resorts
 * @param {bool} multi Define if the call is on multi dates
 */
export function* getAvailabilities(payload, resorts) {
  // const locale = yield select(makeSelectLocale())
  // const queryAvailabilities = payloadToQueryAvailability({ ...payload, resorts, locale })

  const res = yield call(request, config.api.availabilities_resort, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: mockAvailabilitiesResortPayload,
  })

  if (res && res.resortAvailabilities) {
    return res.resortAvailabilities
      .map((item) => ({ ...item, resortId: item.resortCode }))
  }
  return []
}

/** *****************************************
 * Search hotels according to booking form widget with the new API
 * Get search params from URL
 * @param {*} action Payload params from URL query
 */
export function* getHotelsAvailabilities(action) {
  const { payload: { query } } = action

  if (!query.rooms || !query.rooms.length) {
    return yield put(errorAction('Number of rooms incorrect!'))
  }

  // Store the search params
  yield getQuerySearch(query)

  // Get the min capacity of each room
  const numberOfAdults = Math.min(...query.rooms.map((obj) =>
    Object.values(obj).reduce((acc, curr) => parseInt(acc, 10) + parseInt(curr, 10))
    , 0))

  // Override number of adults to 1 in order to get the min price
  const hotels = yield searchHotels({
    payload: {
      ...query,
      numberOfAdults: numberOfAdults || 1,
      numberOfChildren: 0,
    },
  })
  console.log('HOTELS', hotels)
  yield put(requestAvailabilitiesSuccess(jsonToHotels(hotels)))

  delete query.rooms
  return yield put(push(new URLQueryBuilder(null, query).getPath('/results')))
}

/** *****************************************
 * Get the payload and select all rooms in it to send them to the store
 * @param {object} payload Params from URL query
 */
export function* getQuerySearch(payload) {
  let rooms = []
  if (payload.rooms) {
    rooms = payload.rooms
  } else {
    rooms = yield select(getInitValues({ query: payload }, 'rooms'))
    rooms = rooms.rooms || rooms // Avoid too deep object
  }
  // Send searched rooms to the store
  yield put(setQuerySearch({
    specialRateCode: payload.rateCode,
    specialRateType: payload.rateType,
    arrivalDate: payload.arrival,
    departureDate: payload.departure,
    location: payload.location,
    rooms: jsonToRoomSearch(rooms),
    resortId: payload.resortId,
    srp: payload.srp,
    skin: payload.skin,
  }))
}

/** *****************************************
 * Get Hotels IDs / Availabilities / Hotel details and merge all of them in one array
 * @param {*} action Payload params from URL query
 */
export function* searchHotels(action) {
  yield put(setAvailableDisplayApp())

  const { payload } = action
  let resortsDistances = null
  // Get the searched resort or all resorts in the searched location
  let resortIdList = null
  let locationToBeDefined = true

  if (!payload.resortId) {
    locationToBeDefined = false
    // Get resorts from coord or from address
    if (payload.coord && payload.radius) {
      resortsDistances = yield geolocHotelFromCenter(payload.coord, payload.radius)
    } else {
      resortsDistances = yield geolocHotelFromAddress(payload.location)
    }

    // Get resort IDs
    resortIdList = resortsDistances ? resortsDistances.map((r) => ({ id: r.resortId })) : []
  } else {
    // Set unique resort ID
    resortIdList = [{ id: payload.resortId }]
  }

  if (resortIdList.length <= 0) {
    if (!payload.coord) {
      // Do not clear hotels list if it's a search by coordinates
      yield put(requestSearchError())
    }
    return []
  }

  // Get rooms availabilities of all resorts
  const availabilities = yield getAvailabilities(payload, resortIdList)
  // Only display resort with availabilities
  resortIdList = availabilities.map((avb) => ({ id: avb.resortId }))

  // Get details of all resort (address, stars, main picture...)
  let reqHotel = yield getResortsDetails(resortIdList)
  reqHotel = _.uniqBy(reqHotel.resortList, 'id')

  // If location has to be defined, set a new location in the store
  if (locationToBeDefined && reqHotel[0]) {
    yield requestGeoloc({ location: reqHotel[0].city || payload.location })
  }

  // Merge all of information in an array of hotels
  let merged = mergeHotels(reqHotel, availabilities, 'rooms', 'roomRate')

  // merged = mergeHotels(merged, 'ratePlans', 'ratePlan');

  // Get the amenities
  const reqAmenities = yield getAmenities(resortIdList)
  merged = mergeHotels(reqHotel, reqAmenities.featureListByResortId, 'amenityList', 'featureList')

  // If it's a specific resort searched and there is no rooms / rateplans
  if (!payload.disableSearchAround && payload.resortId && merged[0] && (!merged[0].rooms || merged[0].rooms.length <= 0) && (!merged[0].ratePlans || merged[0].ratePlans.length <= 0)) {
    if (payload.location) {
      const newPayload = { ...payload }
      newPayload.disableSearchAround = true
      delete newPayload.resortId
      // Search other hotels according to the current hotel location
      const completeMergedHotels = yield searchHotels({ payload: newPayload })
      merged = completeMergedHotels
    }
  }

  // inject distance from center into hotels
  if (resortsDistances) {
    return mergeHotels(merged, resortsDistances, 'distance', 'distance')
  }

  return merged
}

/**
 * Get hotels according to the center and the radius in parameters
 * @param {*} center The center point {lat, lng} of the search
 * @param {*} radius The radius to looking for
 */
export function* geolocHotelFromCenter(center, radius = null) {
  const opts = {
    method: 'GET',
  }

  // const locale = yield select(makeSelectLocale());
  const locale = 'en-us'
  // Get radius config for the city according to the config file
  // Parse location and compare config with geoloc on 2 digit because of accuracy
  const objRadius = (radius ? { radius } : null) || config.radius.cities.find((rad) => (
    parseFloat(rad.lon).toFixed(2) === parseFloat(center.lng).toFixed(2) && parseFloat(rad.lat).toFixed(2) === parseFloat(center.lat).toFixed(2)
  )) || config.radius.default

  const query = {
    longitude: center.lng,
    latitude: center.lat,
    radius: objRadius.radius,
    locale,
  }

  const response = yield call(request, new URLQueryBuilder(config.api.geosearch, query).getUrl(), opts)

  if (!response.error) {
    return response.resortDistanceList
  }

  return response
}

/**
 * Get coordinates according to location searched and return geosearch with array of resort id
 * Or get coordinates and return all resort of a country if it's a country searched
 * @param {*} address Location to search
 */
export function* geolocHotelFromAddress(address) {
  const opts = {
    method: 'GET',
  }

  const location = yield requestGeoloc({ location: address })

  // Return empty array if there is no result
  if (!location) return []

  // const locale = yield select(makeSelectLocale())
  const locale = 'en-us'
  let results = null

  // Search by country
  if (location.types && location.types.includes('country') && location.country) {
    const response = yield call(request, Api.url(config.api.countrysearch, { countryName: location.country.toUpperCase(), locale }), opts)

    if (!response.error && response.resortIdList) {
      // Format the answer in order to get the same object in each result call
      results = response.resortIdList.map((resortId) => ({ resortId }))
    }
  }

  if (!results) {
    // Get resorts from location center
    results = yield geolocHotelFromCenter(location)
  }

  return results
}

export function* requestGeoloc(location) {
  const opts = {
    method: 'GET',
  }

  const hotels = yield select(getHotels)
  // Default location because '+' is recognized by google as address value
  let escapedLocation = '+'

  if (location.location) {
    // Location is the location in the params
    escapedLocation = location.location
    escapedLocation = escapedLocation.replace(/\s\(Mainland\)/gi, '').replace(/\s\(大陆\)/gi, '')
  } else {
    // If a resort id is defined, define the location center as this hotel
    escapedLocation = ((hotels.get(0) || hotels[0]) ? `${hotels.get(0).address}+${hotels.get(0).city || ''}` : escapedLocation)
  }
  // Escape location replacing space by '+'
  escapedLocation = escapedLocation.split(' ').join('+')

  // const locale = yield select(makeSelectLocale());
  const locale = 'en-us'
  const channel = `GT-${getLocaleLanguage(locale)}-Geolocation`
  const url = Api.url(config.api.google.geocode, { address: escapedLocation, key: config.keys.google, channel })
  const geoloc = yield call(request, url, opts)

  if (geoloc.results && geoloc.results.length > 0) {
    const results = geoloc.results.pop()
    const country = (results.address_components || []).find((res) => res.types.includes('country'))
    const searchLocation = jsonToLocation({
      ...results.geometry.location,
      types: results.types,
      country: country ? country.short_name : null,
    })
    yield put(requestGeolocSearchSuccess(searchLocation))
    return searchLocation
  }

  return null
}

/**
 * Get all resort details for each resort id in the list
 * @param {Array} payload List of resort id to get
 */
export function* getResortsDetails(payload) {
  // Create URI like id=a&id=b&id=c
  const params = payload.reduce((acc, p) => `${acc}&resortIdList=${p.id}`, '')
  // const locale = yield select(makeSelectLocale());
  const locale = 'en-us'
  return yield call(request, `${config.api.resorts}/?${params}&locale=${locale}`)
}

/**
 * Get all features for each resort id in the list
 * @param {*} resortIdList List of resort id to get
 */
export function* getAmenities(resortIdList) {
  let amenities = null
  // Create URI like id=a&id=b&id=c
  const params = resortIdList.reduce((acc, p) => `${acc}&resortIdList=${p.id}`, '')
  // const locale = yield select(makeSelectLocale());
  const locale = 'en-us'

  try {
    amenities = yield call(request, `${config.api.amenities}/?${params}&locale=${locale}`)
  } catch (ex) {
    amenities = {}
  }

  return amenities
}
