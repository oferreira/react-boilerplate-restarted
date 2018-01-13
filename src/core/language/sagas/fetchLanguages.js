/**
 * Get languages from Drupal
 */
import { call, put, select, takeLatest } from 'redux-saga/effects'
import request from 'core/utils/request'
import { createUrl } from 'core/utils/api'
import injectSaga from 'core/sagas/utils/injectSaga'
import requestLoaded from 'core/sagas/actions/requestLoaded'
import { makeSelectLocale } from 'core/language/selectors'
import {
  REQUEST_LANGUAGES,
  REQUEST_LANGUAGES_SUCCESS,
} from 'core/language/constants'

/**
 * fetch languages
 */
export function* fetchLanguages({ id }) {
  const locale = yield select(makeSelectLocale())
  const url = createUrl('{locale}/api/v2/languages', { id, locale })

  try {
    const payload = yield call(request, url)
    yield put(requestLoaded(REQUEST_LANGUAGES_SUCCESS, payload, id))
  } catch (e) {
    throw new Error(e)
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* fetchLanguagesWatcher() {
  yield takeLatest(REQUEST_LANGUAGES, fetchLanguages)
}

export const injectDrupalFetchLanguagesWatcher = () => injectSaga({ key: 'injectDrupalFetchLanguagesWatcher', saga: fetchLanguagesWatcher })

export default fetchLanguagesWatcher