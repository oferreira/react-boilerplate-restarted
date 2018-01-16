/*
 *
 * Search hotels reducer
 *
 */

import { fromJS, Record } from 'immutable'
import {
  REQUEST_HOTEL_SEARCH,
  REQUEST_HOTEL_SEARCH_SUCCESS,
  REQUEST_HOTEL_SEARCH_ERROR,
  REQUEST_HOTEL_PLACE_SUCCESS,
  REQUEST_HOTEL_PLACE_ERROR,
  REQUEST_SEARCH_CURRENT_LOCATION,
  REQUEST_SEARCH_CURRENT_LOCATION_SUCCESS,
  REQUEST_SEARCH_CURRENT_LOCATION_ERROR,
} from '../constants'

const initialState = fromJS({
  results: new Record(),
  fetchingHotel: false,
  fetchingPlace: false,
  error: null,
})

function searchHotelReducer(state = initialState, action) {
  const { type, payload, error } = action

  switch (type) {
    case REQUEST_HOTEL_SEARCH:
      return state.merge({ fetchingHotel: true, fetchingPlace: true })
    case REQUEST_SEARCH_CURRENT_LOCATION:
      return state.merge({ fetchingHotel: true })
    case REQUEST_HOTEL_SEARCH_SUCCESS:
      return state
        .setIn(['results', 'hotels'], payload.hotels)
        .set('fetchingHotel', false)
        .set('error', null)
    case REQUEST_HOTEL_PLACE_SUCCESS:
      return state
        .set('results', payload.places)
        .set('fetchingPlace', false)
        .set('error', null)
    case REQUEST_SEARCH_CURRENT_LOCATION_SUCCESS:
      return state
        .setIn(['results', 'rawtext'], payload.currentLocation)
        .set('fetchingHotel', false)
        .set('error', null)
    case REQUEST_HOTEL_SEARCH_ERROR:
    case REQUEST_HOTEL_PLACE_ERROR:
    case REQUEST_SEARCH_CURRENT_LOCATION_ERROR:
      return state.merge({ fetchingHotel: false, fetchingPlace: false, error })
    default:
      return state
  }
}

export default searchHotelReducer
