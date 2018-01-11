/*
 *
 * Hotels features actions
 *
 */

import {
  REQUEST_HOTEL_FEATURES,
} from '../constants'

export function requestFeatures(query) {
  return {
    type: REQUEST_HOTEL_FEATURES,
    payload: { query },
  }
}
