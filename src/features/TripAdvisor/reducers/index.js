/*
 *
 * TripAdvisor reducer
 *
 */

import { fromJS } from 'immutable'
import {
  REQUEST_TA,
  REQUEST_SUCCESS,
  REQUEST_ERROR,
} from '../constants'

const initialState = fromJS({
  ratings: {}, // Working with key/value map > key = hotel id / value = trip advisor rating
})

function tripAdvisorReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_TA:
      return state.setIn(['ratings', action.id], { fetching: true, rating: {}, error: false })
    case REQUEST_SUCCESS:
      return state.setIn(['ratings', action.id], { fetching: false, rating: action.rating })
    case REQUEST_ERROR:
      return state.setIn(['ratings', action.id], { fetching: false, rating: {}, error: true })
    default:
      return state
  }
}

export default tripAdvisorReducer
