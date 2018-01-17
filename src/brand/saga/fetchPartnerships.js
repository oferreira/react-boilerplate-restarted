/**
 * Get Partnerships from Drupal
 */
import { call, put, select, takeEvery } from 'redux-saga/effects'
import request from 'core/utils/request'
import { createUrl } from 'core/utils/api'
import injectSaga from 'core/sagas/utils/injectSaga'
import requestLoaded from 'core/sagas/actions/requestLoaded'
import { makeSelectPartnerships } from 'brand/selectors'
import {
  REQUEST_PARTNERSHIPS,
  REQUEST_PARTNERSHIPS_SUCCESS,
} from 'brand/constants'

/**
 * fetch partnerships
 */
export function* fetchPartnerships() {
  const partnerships = yield select(makeSelectPartnerships())
  const url = createUrl('{locale}/api/brand/partners-ships', { partnerships })

  try {
    const payload = yield call(request, url)
    yield put(requestLoaded(REQUEST_PARTNERSHIPS_SUCCESS, payload, partnerships))
  } catch (e) {
    throw new Error(e)
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* fetchPartnershipsWatcher() {
  yield takeEvery(REQUEST_PARTNERSHIPS, fetchPartnerships)
}

export const injectDrupalFetchPartnershipsWatcher = () => injectSaga({ key: 'injectDrupalFetchPartnershipsWatcher', saga: fetchPartnershipsWatcher })

export default fetchPartnershipsWatcher
