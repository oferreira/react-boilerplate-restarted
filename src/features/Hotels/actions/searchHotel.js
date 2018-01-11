/*
 *
 * Hotels Search actions
 *
 */

import {
  REQUEST_HOTEL_SEARCH,
} from '../constants'

export function requestSearch(query) {
  return {
    type: REQUEST_HOTEL_SEARCH,
    payload: { query },
  }
}
