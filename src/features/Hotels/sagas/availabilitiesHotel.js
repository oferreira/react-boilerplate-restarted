/**
 * Gets the repositories of the user from Github
 */
/* global config */
import { take, takeLatest, takeEvery, cancel, put, call, select } from 'redux-saga/effects'
import { push, LOCATION_CHANGE } from 'react-router-redux'
import moment from 'moment'
import request from 'core/utils/request'
import { createUrl } from 'core/utils/api'

import { makeSelectLocale } from 'core/language/selectors'

import { getPayloadMinRoomGuests } from './utils'

import {
  availabilitiesRequestSuccess,
  availabilitiesRequestError,
  availabilitiesFromCoordinatesRequestSuccess,
  availabilitiesFromCoordinatesRequestError,
  alternativeDateSuccess,
  alternativeDateError,
} from '../actions'

import {
  REQUEST_HOTEL_AVAILABILITIES,
  REQUEST_HOTEL_FROM_COORDINATES_AVAILABILITIES,
  REQUEST_ALTERNATIVE_DATES_HOTEL_AVAILABILITIES,
} from '../constants'

/**
 * Get resort availabilities according to the searched payload
 * @param {object} payload Params from URL query
 * @param {*} resorts Array of selected resorts
 * @param {bool} multi Define if the call is on multi dates
 */
// export function* getAvailablities(payload, resorts, multi = false) {
//   // const startDate = moment(arrival, 'YYYY-MM-DDT00:00:00').toISOString()
//   // const endDate = moment(departure, 'YYYYMMDD').toISOString()

//   const locale = yield select(makeSelectLocale())
//   const queryAvailabilities = payloadToQueryAvailability({ ...payload, resorts, locale })

//   const reqAva = yield call(request, multi ? config.api.alternative_availabilities : config.api.availabilities, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: queryAvailabilities,
//   })

//   return reqAva
// }

/** *****************************************
 * Get Hotels IDs / Availabilities / Hotel details and merge all of them in one array
 * @param {*} action Payload params from URL query
 */
export function* searchHotels({ payload }) {
  
}

/** *****************************************
 * Search hotels according to booking form widget
 * Get search params from URL
 * @param {*} action Payload params from URL query
 */
export function* searchHotelsToBook({ payload }) {
  if (!payload.rooms || !payload.rooms.length) {
    return yield put(availabilitiesRequestError('Number of rooms incorrect...'))
  }

  // Store the search params
  // yield getQuerySearch(payload)

  // Override number of adults to get the min price
  const customPayload = getPayloadMinRoomGuests(payload)
  const hotels = yield searchHotels({ payload: customPayload })

  return yield put(availabilitiesRequestSuccess(hotels))

  // return yield put(push(new URLQueryBuilder(null, payload).getPath('/results')))
}

/**
 * Search hotels according to coordinates sent
 * @param {*} action Payload params from URL query
 */
export function* searchHotelsToBookFromCoordinates({ payload }) {
  try {
    if (!payload.rooms || !payload.rooms.length || !payload.coord) {
      throw new Error('Missing params...')
    }

    // Override number of adults to get the min price
    const customPayload = getPayloadMinRoomGuests(payload)
    const hotels = yield searchHotels({ payload: customPayload })

    if (hotels.length <= 0) {
      throw new Error('No result...')
    }

    // Success = Update hotels list & geoloc
    // yield put(successGeoloc(payload.coord))
    yield put(availabilitiesFromCoordinatesRequestSuccess(hotels))
  } catch (ex) {
    yield put(availabilitiesFromCoordinatesRequestError(ex.toString()))
  }
}

/** *****************************************
 * Fetch all availabilities in alternative dates of a resort
 * @param {int} id The is of te resort to get alternative availabilities
 */
export function* searchHotelsToBookNewDate({ payload }) {
  
}

export function* watcherSearch() {
  yield [
    takeLatest(REQUEST_HOTEL_AVAILABILITIES, searchHotelsToBook),
    takeLatest(REQUEST_HOTEL_FROM_COORDINATES_AVAILABILITIES, searchHotelsToBookFromCoordinates),
    takeEvery(REQUEST_ALTERNATIVE_DATES_HOTEL_AVAILABILITIES, searchHotelsToBookNewDate),
  ]
}

export function* rootSearch() {
  const watcher = yield call(watcherSearch)
  yield take(LOCATION_CHANGE)
  yield cancel(watcher)
}

/** *****************************************
 * Root saga manages watcher lifecycle
 */
export default rootSearch
