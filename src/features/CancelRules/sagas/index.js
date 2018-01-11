/* global config */
import moment from 'moment'
import { takeEvery, put, call, select } from 'redux-saga/effects'
import request from 'core/utils/request'
import { createUrl } from 'core/utils/api'
import { makeSelectLocale } from 'core/language/selectors'
import { getQuerySearch } from 'containers/Search/selectors'

// constants
import {
  HOTEL_GET_CANCELLATION_RULES,
  HOTEL_GET_WORDING_RULES,
  DEFAULT_CANCELLATION_RULES,
} from '../constants'

// actions
import {
  requestCancelRulesSuccess,
  requestWordingRulesSuccess,
  requestWordingRulesError,
} from '../actions'

export function* fetchCancelRules(action) {
  // Default moment() locale
  moment.locale('en-AU')

  const date = yield select(getQuerySearch)
  const url = createUrl(config.api.cancelRules, { resortId: action.resortId, rateCode: action.rateCode, date: date.arrivalDate })

  try {
    const rules =
      yield call(request, url, {
        method: 'GET',
      })
    const locale = yield select(makeSelectLocale())
    yield put(requestCancelRulesSuccess({ ...rules, resortId: action.resortId, rateCode: action.rateCode }))
    const responseWording = yield call(fetchWordingRules, { key: rules.cancellationRuleList[0].cancellationRule, locale })
    if (!responseWording) yield call(fetchWordingRules, { key: DEFAULT_CANCELLATION_RULES.toLowerCase(), locale, rules: rules.cancellationRuleList })
  } catch (ex) {
    yield put(requestWordingRulesError(ex))
  }
}

export function* fetchWordingRules(action) {
  const url = createUrl(config.api.wordingRules, { key: action.key, lang: action.locale })
  try {
    const wording =
      yield call(request, url, {
        method: 'GET',
      })
    if (Array.isArray(wording)) throw new Error(wording)
    yield put(requestWordingRulesSuccess(wording))
  } catch (ex) {
    yield put(requestWordingRulesError(ex))
  }
}

export function* cancelRules() {
  yield takeEvery(HOTEL_GET_CANCELLATION_RULES, fetchCancelRules)
}

export function* wordingRules() {
  yield takeEvery(HOTEL_GET_WORDING_RULES, fetchWordingRules)
}

export default [cancelRules, wordingRules]
