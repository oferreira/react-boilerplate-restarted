/*
 * Router reducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */

import { fromJS } from 'immutable'
import { LOCATION_CHANGE } from 'react-router-redux'
import {
  STATE_NAME,
} from './constants'

const initialState = fromJS({
  location: null,
})

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state.merge({
        location: action.payload,
      })
    default:
      return state
  }
}

export default {
  [STATE_NAME]: reducer,
}
