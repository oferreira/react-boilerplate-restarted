/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { combineReducers } from 'redux-immutable'
import { reducer as form } from 'redux-form/immutable'

import languageReducers from 'core/language/reducers'
import routerReducers from 'core/router/reducers'

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers) {
  return combineReducers({
    form,
    ...routerReducers,
    ...languageReducers,
    ...injectedReducers,
  })
}
