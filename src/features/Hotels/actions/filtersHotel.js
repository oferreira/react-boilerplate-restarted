/*
 *
 * Hotels filters actions
 *
 */

import {
  REQUEST_HOTEL_FILTERS,
} from '../constants'

export function requestFilters(query) {
  return {
    type: REQUEST_HOTEL_FILTERS,
    payload: { query },
  }
}
