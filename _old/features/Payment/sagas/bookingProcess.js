/* global config */
import { put, call } from 'redux-saga/effects'
import { push } from 'react-router-redux'

// utils
import request from 'core/utils/request'

// constants
import { PAYMENT_PROVIDER_ADYEN } from '../constants/providers'
import { PAGE_ERROR_ADYEN, PAGE_ERROR_OPERA } from '../constants/errors'

// actions
import {
  requestBookingProcessSuccess,
  requestBookingProcessError,
} from '../actions'

export function* executeBookingProcess({ payload }) { // eslint-disable-line

  try {
    const req = yield call(request, config.api.bookings_process, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(payload.process),
    })

    if (req.success) {
      if (payload.promise && payload.promise.resolve) payload.promise.resolve(req)
      if (req.paymentUrl && req.paymentUrl !== '') {
        window.location = req.paymentUrl
      } else {
        yield put(requestBookingProcessSuccess(req))
        // yield put(push(`${ROUTE_ORDER.replace(':id', req.confirmationNumber)}#success`))
      }
    } else {
      throw new Error((payload.process.pspReference === PAYMENT_PROVIDER_ADYEN ? PAGE_ERROR_ADYEN : PAGE_ERROR_OPERA))
    }
  } catch (ex) {
    // yield put(requestError(req, (query.pspReference === PAYMENT_PROVIDER_ADYEN ? PAGE_ERROR_ADYEN : PAGE_ERROR_OPERA)));
    // return yield put(push(ROUTE_ERROR))
    if (payload.promise && payload.promise.reject) payload.promise.reject(ex)
    yield put(requestBookingProcessError(ex))
  }
}
