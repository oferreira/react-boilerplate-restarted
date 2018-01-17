/* global config */
import { takeLatest, put, call } from 'redux-saga/effects'

// utils
import request from 'core/utils/request'
import { createUrl } from 'core/utils/api'

// constants
import { REQUEST_COOKIE_POLICY } from '../constants'


// actions
import {
  requestCookiePolicySuccess,
} from '../actions'

// Utils
import { jsonToCookiePolicy } from '../types'

export function* fetchCookiePolicy({ payload }) { // eslint-disable-line
  let req = null
  try {
    // req = yield call(request, createUrl(config.api.cookiePolicy, { lang: payload.locale }))
    req = yield call(request, createUrl(config.api.cookiePolicy, { lang: 'fr-fr' }))

    const res = yield call(request, config.api.availabilities, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ toto: 'aaa' }),
    })

    console.log(res)

    if (req.error) throw new Error(req)

    const cookiePolicy = jsonToCookiePolicy(req)
    yield put(requestCookiePolicySuccess(cookiePolicy))
  } catch (e) {
    console.error(e)
  }
}


export default function* watchCookiePolicy() {
  yield takeLatest(REQUEST_COOKIE_POLICY, fetchCookiePolicy)
}
