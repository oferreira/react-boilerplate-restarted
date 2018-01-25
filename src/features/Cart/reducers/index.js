/*
 *
 * Hotels reducer
 *
 */

import { fromJS, List } from 'immutable'
import {
  CART_INIT,
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_UPDATE_ITEM,
  CART_EMPTY,
} from '../constants'

const initialState = fromJS({

})

function tripAdvisorReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CART_INIT:
      return state
        .set(payload.type, state.get(payload.type) || new List())
    case CART_EMPTY:
      return state
        .set(payload.type, new List())
    case CART_ADD_ITEM:
      return state
        .set(payload.type, state.get(payload.type).push({ ...(payload.item.toJS ? payload.item.toJS() : payload.item), options: payload.options }))
    case CART_REMOVE_ITEM:
      return state
        .set(payload.type, state.get(payload.type).delete(payload.index))
    case CART_UPDATE_ITEM:
      return state
        .setIn([payload.type, payload.index], { ...(payload.item.toJS ? payload.item.toJS() : payload.item), options: payload.options })
    default:
      return state
  }
}

export default tripAdvisorReducer
