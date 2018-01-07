/*
 *
 * Drupal reducer
 *
 */

import { fromJS } from 'immutable'
import injectReducer from 'core/reducers/utils/injectReducer'

import {
  STATE_NAME,
  REQUEST_NODE_SUCCESS,
} from './constants'

const initialState = fromJS({
  nodes: {},
})

export function drupalReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_NODE_SUCCESS:
      return state.setIn(['nodes', action.id], action.payload)
    default:
      return state
  }
}

export const injectDrupalReducer = () => injectReducer({ key: STATE_NAME, reducer: drupalReducer })

export default {
  [STATE_NAME]: drupalReducer,
}
