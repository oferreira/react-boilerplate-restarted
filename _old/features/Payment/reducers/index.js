/**
 * 1 reducer because it's a pretty simple one
 */
import { fromJS } from 'immutable'
import {
  REQUEST_PAYMENT_CONFIG,
  REQUEST_PAYMENT_CONFIG_SUCCESS,
  REQUEST_PAYMENT_CONFIG_ERROR,
  REQUEST_BOOKING_PROCESS,
  REQUEST_BOOKING_PROCESS_SUCCESS,
  REQUEST_BOOKING_PROCESS_ERROR,
} from '../constants'

const initialState = fromJS({
  config: {},
  fetchingConfig: false,
  requesting: false,
})

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case REQUEST_PAYMENT_CONFIG:
      return state.merge({ config: {}, fetchingConfig: true })
    case REQUEST_PAYMENT_CONFIG_SUCCESS:
      return state.merge({ config: payload.value, fetchingConfig: false })
    case REQUEST_PAYMENT_CONFIG_ERROR:
      return state.merge({ fetchingConfig: false })
    case REQUEST_BOOKING_PROCESS:
      return state.merge({ requesting: true })
    case REQUEST_BOOKING_PROCESS_SUCCESS:
    case REQUEST_BOOKING_PROCESS_ERROR:
      return state.merge({ requesting: false })
    default:
      return state
  }
}
