/*
 *
 * Hotels availabilities actions
 *
 */

import {
  REQUEST_HOTEL_DETAILS,
} from '../constants'

export function requestDetails(resorts) {
  return {
    type: REQUEST_HOTEL_DETAILS,
    payload: { resorts },
  }
}
