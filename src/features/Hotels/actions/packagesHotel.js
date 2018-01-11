/*
 *
 * Hotels packages actions
 *
 */

import {
  REQUEST_HOTEL_PACKAGES,
} from '../constants'

export function requestPackages(query) {
  return {
    type: REQUEST_HOTEL_PACKAGES,
    payload: { query },
  }
}
