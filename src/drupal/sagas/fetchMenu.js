/**
 * Get informations of a Menu from Drupal
 */

import { call, put, select, takeEvery } from 'redux-saga/effects'
import request from 'core/utils/request'
import { createUrl } from 'core/utils/api'
import injectSaga from 'core/sagas/utils/injectSaga'
import requestLoaded from 'core/sagas/actions/requestLoaded'
import { makeSelectLocale } from 'core/language/selectors'
import {
  DRUPAL_REQUEST_MENU,
  DRUPAL_REQUEST_MENU_SUCCESS,
} from 'drupal/constants'

/**
 * Github repos request/response handler
 */
export function* fetchMenu({ id }) {
  const locale = yield select(makeSelectLocale())
  const url = createUrl('{locale}/api/menu/{id}', { id, locale })

  try {
    const payload = yield call(request, url)
    yield put(requestLoaded(DRUPAL_REQUEST_MENU_SUCCESS, payload, id))
  } catch (e) {
    throw new Error(e)
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* fetchMenuWatcher() {
  yield takeEvery(DRUPAL_REQUEST_MENU, fetchMenu)
}

export const injectDrupalFetchMenuWatcher = () => injectSaga({ key: 'injectDrupalFetchMenuWatcher', saga: fetchMenuWatcher })

export default fetchMenuWatcher
