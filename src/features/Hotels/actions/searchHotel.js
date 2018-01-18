/*
 *
 * Hotels Search actions
 *
 */

import {
  REQUEST_HOTEL_SEARCH,
  REQUEST_HOTEL_SEARCH_ERROR,
  REQUEST_GEOLOC_SEARCH,
  REQUEST_GEOLOC_SEARCH_SUCCESS,
  REQUEST_GEOLOC_SEARCH_ERROR,
  SET_QUERY_SEARCH,
} from '../constants'

export const requestSearch = (query) => ({
  type: REQUEST_HOTEL_SEARCH,
  payload: { query },
})

export const requestSearchError = () => ({
  type: REQUEST_HOTEL_SEARCH_ERROR,
})

export const setQuerySearch = (querySearch) => ({
  type: SET_QUERY_SEARCH,
  payload: { querySearch },
})

export const requestGeolocSearch = (location) => ({
  type: REQUEST_GEOLOC_SEARCH,
  payload: { location },
})

export const requestGeolocSearchSuccess = (payload) => ({
  type: REQUEST_GEOLOC_SEARCH_SUCCESS,
  payload,
})

export const requestGeolocSearchError = (error) => ({
  type: REQUEST_GEOLOC_SEARCH_ERROR,
  payload: { error },
})
