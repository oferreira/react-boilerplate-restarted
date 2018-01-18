/*
 *
 * Hotels availabilities actions
 *
 */

import {
  REQUEST_HOTEL_DETAILS,
} from '../constants'

export const requestDetails = (resorts) => ({
  type: REQUEST_HOTEL_DETAILS,
  payload: resorts,
})
