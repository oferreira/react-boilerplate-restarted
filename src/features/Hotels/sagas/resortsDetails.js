import { call, select } from 'redux-saga/effects'
import request from 'core/utils/request'

/**
 * Get all resort details for each resort id in the list
 * @param {Array} payload List of resort id to get
 */
export function* getResortsDetails({ payload }) {
  // Create URI like id=a&id=b&id=c
  const params = payload.reduce((acc, p) => `${acc}&resortIdList=${p.id}`, '')
  // const locale = yield select(makeSelectLocale());
  const locale = 'en-us'
  return yield call(request, `${config.api.resorts}/?${params}&locale=${locale}`)
}
