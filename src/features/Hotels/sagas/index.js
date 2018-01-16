import { takeLatest, all } from 'redux-saga/effects'

import {
  REQUEST_HOTEL_AVAILABILITIES,
} from '../constants'

import { getAvailabilities } from './availabilitiesHotel'

export default function* () {
  yield all([
    takeLatest(REQUEST_HOTEL_AVAILABILITIES, getAvailabilities),
    // takeLatest(REQUEST_BOOKING_PROCESS, executeBookingProcess),
    // takeLatest(REQUEST_PAYMENT_CONFIRMATION, executePaymentConfirmation),
  ])
}
