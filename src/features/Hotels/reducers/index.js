/*
 *
 * Hotels reducer
 *
 */

import { combineReducers } from 'redux-immutable'

import availabilitiesReducer from './availabilitiesHotel'
import searchHotelReducer from './searchHotel'

export default combineReducers({
  autocomplete: searchHotelReducer,
  availabilities: availabilitiesReducer,
})
