/* global config */
import { put, call, select } from 'redux-saga/effects'

// utils
import request from 'core/utils/request'
import { createUrl } from 'core/utils/api'

// Selectors
import { makeSelectLocale } from 'core/language/selectors'

// Local import
import {
  requestPaymentConfigSuccess,
  requestPaymentConfigError,
} from '../actions'

export function* fetchPaymentConfig({ payload }) { // eslint-disable-line
  try {
    let req = null
    const lang = yield select(makeSelectLocale())
    req = yield call(request, createUrl(config.api.bookings_config, { id: payload.id, lang: 'fr-fr' }))
    // Dispatch response
    if (req.success) yield put(requestPaymentConfigSuccess(req))
    else throw new Error(req)
  } catch (ex) {
    yield put(requestPaymentConfigError(ex))
  }
}
