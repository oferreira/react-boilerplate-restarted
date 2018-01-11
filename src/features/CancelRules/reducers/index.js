import { fromJS } from 'immutable'

// constants
import {
  HOTEL_GET_CANCELLATION_RULES_SUCCESS,
  HOTEL_GET_WORDING_RULES_SUCCESS,
  HOTEL_GET_RULES_ERROR,
} from '../constants'

export const initialState = fromJS({
  rules: {},
  wording: {},
  error: null,
})

function RulesReducer(state = initialState, action) {
  switch (action.type) {
    case HOTEL_GET_CANCELLATION_RULES_SUCCESS:
      return state.setIn(
        ['rules', action.values.rateCode],
        action.values.cancellationRuleList,
      )
    case HOTEL_GET_WORDING_RULES_SUCCESS:
      return state.setIn(
        ['wording', action.values.title],
        action.values,
      )
    case HOTEL_GET_RULES_ERROR:
      return state.set('error', action.error)
    default:
      return state
  }
}

export default RulesReducer
