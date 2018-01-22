/*
 * ExpandReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true)
 */

import { Map } from 'immutable'

import {
  EXPAND_FULL_OPEN,
  EXPAND_FULL_CLOSE,
  EXPAND_FULL_CLOSE_ALL,
} from './constants'

// The initial state of the Homepage
export const initialState = new Map()

function searchReducer(state = initialState, action) {
  switch (action.type) {
    case EXPAND_FULL_OPEN: {
      return state.set(action.name, true)
    }
    case EXPAND_FULL_CLOSE: {
      return state.set(action.name, false)
    }
    case EXPAND_FULL_CLOSE_ALL: {
      return state.map(() => false)
    }
    default:
      return state
  }
}

export default searchReducer
