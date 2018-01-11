/*
 *
 * Hotels reducer
 *
 */

import { fromJS } from 'immutable'
import {
  CART_ADD_ROOM,
} from '../constants'

const initialState = fromJS({
  hotels: {},
})

function tripAdvisorReducer(state = initialState, action) {
  switch (action.type) {
    case CART_ADD_ROOM:
      return state.setIn(['hotels', action.payload.id], action.payload.room)
    default:
      return state
  }
}

export default tripAdvisorReducer
