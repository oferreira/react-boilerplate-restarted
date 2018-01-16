/*
 *
 * Comparator hotels actions
 *
 */

import {
  REQUEST_HOTEL_COMPARATOR,
} from '../constants'

export function requestComparator(query) {
  return {
    type: REQUEST_HOTEL_COMPARATOR,
    payload: { query },
  }
}
