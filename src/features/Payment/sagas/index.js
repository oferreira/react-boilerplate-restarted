import { takeLatest, all } from 'redux-saga/effects'

import {
  REQUEST_PAYMENT_CONFIG,
  REQUEST_BOOKING_PROCESS,
  REQUEST_PAYMENT_CONFIRMATION,
} from '../constants'

import { executeBookingProcess } from './bookingProcess'
import { fetchPaymentConfig } from './configPayment'
import { executePaymentConfirmation } from './confirmationPayment'

export default function* () {
  yield all([
    takeLatest(REQUEST_PAYMENT_CONFIG, fetchPaymentConfig),
    takeLatest(REQUEST_BOOKING_PROCESS, executeBookingProcess),
    takeLatest(REQUEST_PAYMENT_CONFIRMATION, executePaymentConfirmation),
  ])
}
