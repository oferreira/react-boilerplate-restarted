/**
 * Get informations of a Faq from Drupal
 */

import { call, put, select, takeEvery } from 'redux-saga/effects'
import request from 'core/utils/request'
import { createUrl } from 'core/utils/api'
import injectSaga from 'core/sagas/utils/injectSaga'
import requestLoaded from 'core/sagas/actions/requestLoaded'
import { makeSelectLocale } from 'core/language/selectors'
import {
  DRUPAL_REQUEST_FAQ,
  DRUPAL_REQUEST_FAQ_SUCCESS,
} from 'drupal/constants'

/**
 * Github repos request/response handler
 */
export function* fetchFaq() {
  const locale = yield select(makeSelectLocale())
  const url = createUrl('{locale}/api/faq', { locale })
  // const url = createUrl('http://gt-drupal-dev.louvrehotels.com/{locale}/api/v2/nodes/faq', { locale })

  try {
    const payload = yield call(request, url)
    yield put(requestLoaded(DRUPAL_REQUEST_FAQ_SUCCESS, payload))
  } catch (e) {
    throw new Error(e)
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* fetchFaqWatcher() {
  yield takeEvery(DRUPAL_REQUEST_FAQ, fetchFaq)
}

export const injectDrupalFetchFaqWatcher = () => injectSaga({ key: 'injectDrupalFetchFaqWatcher', saga: fetchFaqWatcher })

export default fetchFaqWatcher
