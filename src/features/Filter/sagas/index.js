import { takeLatest } from 'redux-saga/effects'

// constants
import { APPLY_FILTER } from './constants'

export function* applyFilters(action) { // eslint-disable-line

}

export function* watchFilter() {
  yield takeLatest(APPLY_FILTER, applyFilters)
}

export default [watchFilter]
