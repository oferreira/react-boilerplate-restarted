/*
 *
 * Partnerships reducer
 *
 */
import { fromJS } from 'immutable'
import {
  PARTNERSHIP_STORE_NAME,
  REQUEST_PARTNERSHIP_SUCCESS,
} from './constants'

const initialState = fromJS({
  partnerships: {},
})

function reducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_PARTNERSHIP_SUCCESS:
      return state
        .set('partnerships', action.payload)
    default:
      return state
  }
}

export default {
  [PARTNERSHIP_STORE_NAME]: reducer,
}
