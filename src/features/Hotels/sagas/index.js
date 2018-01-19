import { takeLatest, all, call } from 'redux-saga/effects'

import {
  REQUEST_HOTEL_AVAILABILITIES,
  REQUEST_HOTEL_DETAILS,
  REQUEST_GEOLOC_SEARCH,
} from '../constants'

import {
  getHotelsAvailabilities,
  requestGeoloc,
} from './availabilitiesHotel'
import { getResortsDetails } from './resortsDetails'

export default function* () {
  yield all([
    takeLatest(REQUEST_HOTEL_AVAILABILITIES, getHotelsAvailabilities),
  ])
}
