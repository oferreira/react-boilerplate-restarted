/* global config */
import { takeLatest, put, call, select } from 'redux-saga/effects'
import request from 'core/utils/request'

import makeSelectLocale from 'core/language/selectors/makeSelectLocale'
import { createUrl } from 'core/utils/api'

import {
  jsonToRooms,
  jsonToRatePlans,
  jsonToFeatures,
  payloadToQueryAvailability,
  jsonToSortedPictures,
} from '../types'

import {
  requestRoomsAvailabilitiesSuccess,
  requestRoomsAvailabilitiesError,
  requestRoomsFeatures,
  requestRoomsFeaturesSuccess,
  requestRoomsFeaturesError,
  requestRoomsGallerySuccess,
  requestRoomsGalleryError,
} from '../actions'

import {
  REQUEST_ROOMS_AVAILABILITIES,
  REQUEST_ROOMS_FEATURES,
  REQUEST_ROOMS_GALLERY,
} from '../constants'

export function* getAvailabilitiesRooms(payload, resortCode) {
  const locale = yield select(makeSelectLocale())
  // const queryAvailabilities = payloadToQueryAvailability({ ...payload, resortCode, locale })
  const queryAvailabilities = payloadToQueryAvailability({ ...payload, resortCode, locale: 'fr-fr' })

  const availabilities = yield call(request, config.api.availabilities, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: queryAvailabilities,
  })

  if (!availabilities || !availabilities[0]) return null

  return {
    rooms: availabilities[0].roomList,
    ratePlans: availabilities[0].ratePlanList,
  }
}

/**
 * Get all detail (availabilities/ratePlan/rooms) of the selected hotel in the search Saga
 * User reload the page > Get the selected hotel
 * @param {*} action Parameters in sent by the wrapped component
 */
export function* fetchRooms({ payload }) {
  // Request query string and fill the store query search
  // yield getQuerySearch(oldPayload)
  const { query } = payload
  const { resortId } = query

  try {
    const availabilities = yield getAvailabilitiesRooms(query, resortId)

    if (availabilities) {
      // Get features
      yield put(requestRoomsFeatures(query))
      yield put(requestRoomsAvailabilitiesSuccess(
        jsonToRooms(availabilities.rooms),
        jsonToRatePlans(availabilities.ratePlans)
      ))
    } else {
      throw new Error(`(Rooms availabilities...) Error: No rooms available for ${resortId}`)
    }
  } catch (ex) {
    yield put(requestRoomsAvailabilitiesError(ex))
  }
}

/**
 * Get all rooms features
 * @param {*} action Parameters in query sent by the wrapped component
 */
export function* fetchRoomsFeatures({ payload }) {
  const { query } = payload
  const resortId = query.id || query.resortId

  try {
    const features = yield call(request, createUrl(config.api.fetch_amenities_rooms, { resortId }))

    if (features) {
      yield put(requestRoomsFeaturesSuccess(
        jsonToFeatures(features.roomCategoryFeatureList || [])
      ))
    } else {
      throw new Error(`(Rooms availabilities...) Error: No rooms available for ${resortId}`)
    }
  } catch (ex) {
    yield put(requestRoomsFeaturesError(ex))
  }
}

/**
 * Get all rooms pictures of the resort and sort them by roomType
 * @param {*} action Code of the selected resort
 */
export function* fetchRoomsGallery({ payload }) {
  const lang = yield select(makeSelectLocale())

  try {
    // const pictures = yield call(request, createUrl(config.api.pictures_rooms, { id: payload.id, lang }))
    const pictures = yield call(request, createUrl(config.api.pictures_rooms, { id: payload.id, lang: 'fr-fr' }))
    if (pictures && pictures.success) {
      const sortedRooms = jsonToSortedPictures(pictures.pictureList)
      yield put(requestRoomsGallerySuccess(sortedRooms))
    } else {
      throw new Error(`(Rooms gallery...) Error: No pictures available for ${payload.id}`)
    }
  } catch (ex) {
    yield put(requestRoomsGalleryError(ex))
  }
}

export default function* roomsHotel() {
  yield [
    takeLatest(REQUEST_ROOMS_AVAILABILITIES, fetchRooms),
    takeLatest(REQUEST_ROOMS_FEATURES, fetchRoomsFeatures),
    takeLatest(REQUEST_ROOMS_GALLERY, fetchRoomsGallery),
  ]
}
