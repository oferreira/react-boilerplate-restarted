/* global config */
import { takeEvery, call, put } from 'redux-saga/effects'

// import { jsonToTripAdvisor } from 'types'

import request from 'core/utils/request'
import Api from 'core/utils/api'

import { REQUEST_TA } from '../constants'
import { requestSuccess, requestError } from '../actions'

function* getHotel(payload) {
  const { id, lang } = payload
  try {
    // Call trip advisor API with custom params
    const TAcall = yield call(request, Api.url(config.api.trip_advisor, { key: config.keys.trip_advisor, id, lang }))

    if (!TAcall.error) {
      // const tripAdvisorHotel = jsonToTripAdvisor(TAcall) // Map json to a specific type
      yield put(requestSuccess(id, TAcall))
    } else {
      yield put(requestError(id))
    }
  } catch (ex) {
    yield put(requestError(id))
  }
}

// Individual exports for testing
export default function* tripAdvisorSaga() {
  yield [
    takeEvery(REQUEST_TA, getHotel),
  ]
}
