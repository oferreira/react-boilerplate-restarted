/*
 *
 * Drupal reducer
 *
 */

import { fromJS } from 'immutable'
import injectReducer from 'core/reducers/utils/injectReducer'

import {
  DRUPAL_STATE_NAME,
  DRUPAL_REQUEST_NODE_SUCCESS,
  DRUPAL_REQUEST_MENU_SUCCESS,
} from './constants'

const initialState = fromJS({
  nodes: {},
  menus: {},
})

export function drupalReducer(state = initialState, action) {
  switch (action.type) {
    case DRUPAL_REQUEST_NODE_SUCCESS:
      return state.setIn(['nodes', action.id], action.payload)
    case DRUPAL_REQUEST_MENU_SUCCESS:
      return state.setIn(['menus', action.id], action.payload)
    default:
      return state
  }
}

export const injectDrupalReducer = () => injectReducer({ key: DRUPAL_STATE_NAME, reducer: drupalReducer })

export default {
  [DRUPAL_STATE_NAME]: drupalReducer,
}
