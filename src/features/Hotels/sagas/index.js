import { takeLatest, all } from 'redux-saga/effects'

import {
  REQUEST_HOTEL_AVAILABILITIES,
  REQUEST_HOTEL_DETAILS,
} from '../constants'

import { getAvailabilities } from './availabilitiesHotel'
import { getResortsDetails } from './resortsDetails'

export default function* () {
  yield all([
    takeLatest(REQUEST_HOTEL_AVAILABILITIES, getAvailabilities),
    takeLatest(REQUEST_HOTEL_DETAILS, getResortsDetails),
  ])
}
