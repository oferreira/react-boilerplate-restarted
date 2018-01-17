/**
 * Get informations of a node from Drupal
 */

import { call, put, select, takeEvery } from 'redux-saga/effects'
import request from 'core/utils/request'
import { createUrl } from 'core/utils/api'
import injectSaga from 'core/sagas/utils/injectSaga'
import requestLoaded from 'core/sagas/actions/requestLoaded'
import { makeSelectLocale } from 'core/language/selectors'
import {
  DRUPAL_REQUEST_NODE,
  DRUPAL_REQUEST_NODE_SUCCESS,
} from 'drupal/constants'

/**
 * Github repos request/response handler
 */
export function* fetchNode({ id }) {
  const locale = yield select(makeSelectLocale())
  const url = createUrl('{locale}/api/node/{id}', { id, locale })

  try {
    const payload = yield call(request, url)
    yield put(requestLoaded(DRUPAL_REQUEST_NODE_SUCCESS, payload, id))
  } catch (e) {
    throw new Error(e)
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* fetchNodeWatcher() {
  yield takeEvery(DRUPAL_REQUEST_NODE, fetchNode)
}

export const injectDrupalFetchNodeWatcher = () => injectSaga({ key: 'injectDrupalFetchNodeWatcher', saga: fetchNodeWatcher })

export default fetchNodeWatcher
