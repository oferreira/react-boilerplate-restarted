import { call, select, put } from 'redux-saga/effects'

/**
 * Core
 */
import request from 'core/utils/request'
import { getLocaleLanguage } from 'core/utils/languages'
import { Api } from 'core/utils/api'
import { URLQueryBuilder } from 'core/utils/functions'

/**
 * Actions
 */
import {
  requestGeolocSearchSuccess,
} from '../actions'

/**
 * Selectors
 */
import {
  getHotels,
} from '../selectors'

/**
 * Types
 */
import {
  jsonToLocation,
} from '../types'

/**
 * Constants
 */
import {
  REQUEST_GEOLOC_SEARCH,
} from '../constants'


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
