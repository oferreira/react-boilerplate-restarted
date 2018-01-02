/*
 *
 * Language reducer
 *
 */

import { fromJS } from 'immutable'

import {
  STATE_NAME,
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
  [STATE_NAME]: reducer,
}
