/**
 * Get Partnerships from Drupal
 */
import { call, put, select, takeEvery } from 'redux-saga/effects'
import request from 'core/utils/request'
import { createUrl } from 'core/utils/api'
import injectSaga from 'core/sagas/utils/injectSaga'
import requestLoaded from 'core/sagas/actions/requestLoaded'
import { makeSelectLocale } from 'core/language/selectors'
import {
  REQUEST_PARTNERSHIP,
  REQUEST_PARTNERSHIP_SUCCESS,
} from 'brand/constants'

/**
 * fetch partnerships
 */
export function* fetchPartnerships() {
  const locale = yield select(makeSelectLocale())
  const url = createUrl('{locale}/api/brand/partners-ships', { locale })

  try {
    const payload = yield call(request, url)
    yield put(requestLoaded(REQUEST_PARTNERSHIP_SUCCESS, payload))
  } catch (e) {
    throw new Error(e)
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* fetchPartnershipsWatcher() {
  yield takeEvery(REQUEST_PARTNERSHIP, fetchPartnerships)
}

export const injectDrupalFetchPartnershipsWatcher = () => injectSaga({ key: 'injectDrupalFetchPartnershipsWatcher', saga: fetchPartnershipsWatcher })

export default fetchPartnershipsWatcher
