/*
 *
 * Hotels reducer
 *
 */

import { combineReducers } from 'redux-immutable'

import availabilitiesReducer from './availabilitiesHotel'
import autocompleteReducer from './autocomplete'

export default combineReducers({
  autocomplete: autocompleteReducer,
  availabilities: availabilitiesReducer,
})
