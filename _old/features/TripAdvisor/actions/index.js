/*
 *
 * TripAdvisor actions
 *
 */

import {
  REQUEST_TA,
  REQUEST_SUCCESS,
  REQUEST_ERROR,
} from '../constants'

export function requestRating(id, lang) {
  return {
    type: REQUEST_TA,
    payload: { id, lang },
  }
}

export function requestSuccess(id, rating) {
  return {
    type: REQUEST_SUCCESS,
    id,
    rating,
  }
}

export function requestError(id) {
  return {
    type: REQUEST_ERROR,
    id,
  }
}
