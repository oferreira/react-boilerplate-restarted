/*
 *
 * Language reducer
 *
 */

import { fromJS } from 'immutable'

import {
  LANGUAGE_STORE_NAME,
  CHANGE_LOCALE,
  DEFAULT_LOCALE,
} from './constants'

const initialState = fromJS({
  locale: DEFAULT_LOCALE,
})

function reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LOCALE:
      return state
        .set('locale', action.locale)
    default:
      return state
  }
}

export default {
  [LANGUAGE_STORE_NAME]: reducer,
}
