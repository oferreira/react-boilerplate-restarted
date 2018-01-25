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
  DRUPAL_REQUEST_NODES,
  DRUPAL_REQUEST_NODES_SUCCESS,
} from 'drupal/constants'

/**
 * Github repos request/response handler
 */
export function* fetchNodes({ id, sort, limit }) {
  const locale = yield select(makeSelectLocale())
  const url = createUrl('http://gt-drupal-dev.louvrehotels.com/{locale}/api/v2/nodes/{id}/{sort}/{limit}', {
    locale, id, sort, limit,
  })

  try {
    const payload = yield call(request, url)
    yield put(requestLoaded(DRUPAL_REQUEST_NODES_SUCCESS, payload, id))
  } catch (e) {
    throw new Error(e)
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* fetchNodesWatcher() {
  yield takeEvery(DRUPAL_REQUEST_NODES, fetchNodes)
}

export const injectDrupalfetchNodesWatcher = () => injectSaga({ key: 'injectDrupalfetchNodesWatcher', saga: fetchNodesWatcher })

export default fetchNodesWatcher
