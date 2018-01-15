/* global config */
import { put, call } from 'redux-saga/effects'
// utils
import request from 'core/utils/request'
// constants
// import { PAGE_ERROR_ADYEN } from 'constants/error'
// actions
// import { displayError } from 'pages/Error/sagas'

import {
  requestPaymentConfirmationSuccess,
  requestPaymentConfirmationError,
} from '../actions'

export function* executePaymentConfirmation({ payload }) { // eslint-disable-line

  try {
    const req = yield call(request, config.api.bookings_verify, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(payload.params),
    })

    if (req.success) {
      if (payload.promise && payload.promise.resolve) payload.promise.resolve(req)
      yield put(requestPaymentConfirmationSuccess(req))
    } else {
      throw new Error(req)
    }
  } catch (ex) {
    if (payload.promise && payload.promise.reject) payload.promise.reject(ex)
    yield requestPaymentConfirmationError(ex)
    // yield displayError(req.message, PAGE_ERROR_ADYEN)
  }
}
