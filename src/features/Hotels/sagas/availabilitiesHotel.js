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
} from '../types'

/**
 * Constants
 */

/**
 * Sagas
 */
import { getResortsDetails } from './resortsDetails'
import { geolocHotelFromCenter, geolocHotelFromAddress, requestGeoloc } from './geoloc'


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
