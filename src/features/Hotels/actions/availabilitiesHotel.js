/*
 *
 * Availabilities hotel actions
 *
 */

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

export const requestAvailabilities = (query, locale) => ({
  type: REQUEST_HOTEL_AVAILABILITIES,
  payload: { query, locale },
})

export const requestAvailabilitiesSuccess = (hotels) => ({
  type: REQUEST_HOTEL_AVAILABILITIES_SUCCESS,
  payload: { hotels },
})

export const requestAvailabilitiesError = (error) => ({
  type: REQUEST_HOTEL_AVAILABILITIES_ERROR,
  payload: { error },
})

/* *************** */
export const availabilitiesFromCoordinatesRequest = (query, locale) => ({
  type: REQUEST_HOTEL_FROM_COORDINATES_AVAILABILITIES,
  payload: { query, locale },
})

export const availabilitiesFromCoordinatesRequestSuccess = (hotels) => ({
  type: REQUEST_HOTEL_FROM_COORDINATES_AVAILABILITIES_SUCCESS,
  payload: { hotels },
})

export const availabilitiesFromCoordinatesRequestError = (error) => ({
  type: REQUEST_HOTEL_FROM_COORDINATES_AVAILABILITIES_ERROR,
  payload: { error },
})

/* *************** */
export const alternativeDateRequest = (id) => ({
  type: REQUEST_ALTERNATIVE_DATES_HOTEL_AVAILABILITIES,
  payload: { id },
})

export const alternativeDateSuccess = (id, alternatives) => ({
  type: REQUEST_ALTERNATIVE_DATES_HOTEL_AVAILABILITIES_SUCCESS,
  payload: { id, alternatives },
})

export const alternativeDateError = (id, error) => ({
  type: REQUEST_ALTERNATIVE_DATES_HOTEL_AVAILABILITIES_ERROR,
  payload: { id, error },
})
