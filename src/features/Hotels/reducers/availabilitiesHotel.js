/*
 *
 * Search hotels reducer
 *
 */

import { fromJS, Record, List } from 'immutable'
import {
  REQUEST_HOTEL_AVAILABILITIES,
  REQUEST_HOTEL_AVAILABILITIES_SUCCESS,
  REQUEST_HOTEL_AVAILABILITIES_ERROR,
  REQUEST_HOTEL_FROM_COORDINATES_AVAILABILITIES,
  REQUEST_HOTEL_FROM_COORDINATES_AVAILABILITIES_SUCCESS,
  REQUEST_HOTEL_FROM_COORDINATES_AVAILABILITIES_ERROR,
  REQUEST_ALTERNATIVE_DATES_HOTEL_AVAILABILITIES,
  REQUEST_ALTERNATIVE_DATES_HOTEL_AVAILABILITIES_SUCCESS,
  REQUEST_ALTERNATIVE_DATES_HOTEL_AVAILABILITIES_ERROR,
} from '../constants'

const initialState = fromJS({
  results: new List(),
  fetching: false,
  fetchingMap: false,
  error: null,
  alternativeDates: {},
})

function availabilitiesHotelReducer(state = initialState, action) {
  const { type, payload, error } = action

  switch (type) {
    case REQUEST_HOTEL_AVAILABILITIES:
      return state.merge({ fetching: true, fetchingMap: true, error: null })
    case REQUEST_HOTEL_AVAILABILITIES_SUCCESS:
    case REQUEST_HOTEL_FROM_COORDINATES_AVAILABILITIES_SUCCESS:
      return state.merge({ results: payload.hotels, fetching: false, fetchingMap: false })
    case REQUEST_HOTEL_AVAILABILITIES_ERROR:
    case REQUEST_HOTEL_FROM_COORDINATES_AVAILABILITIES_ERROR:
      return state.merge({ error, fetchingHotel: false, fetchingPlace: false })
    case REQUEST_HOTEL_FROM_COORDINATES_AVAILABILITIES:
      return state.merge({ fetchingMap: true, error: null })
    case REQUEST_ALTERNATIVE_DATES_HOTEL_AVAILABILITIES:
      return state.setIn(['alternativeDates', action.id], new Record({ loading: true, error: null, alternatives: [] }))
    case REQUEST_ALTERNATIVE_DATES_HOTEL_AVAILABILITIES_SUCCESS:
      return state.setIn(['alternativeDates', action.id], new Record({ loading: false, error: null, alternatives: action.alternatives }))
    case REQUEST_ALTERNATIVE_DATES_HOTEL_AVAILABILITIES_ERROR:
      return state.setIn(['alternativeDates', action.id], new Record({ loading: false, error: action.error, alternatives: [] }))
    default:
      return state
  }
}

export default availabilitiesHotelReducer
