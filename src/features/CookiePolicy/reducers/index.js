import { CookiePolicy } from '../types'
import {
  REQUEST_COOKIE_POLICY_SUCCESS,
} from '../constants'

export const initialState = new CookiePolicy()

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case REQUEST_COOKIE_POLICY_SUCCESS: {
      const newState = payload.value
      return newState
    }
    default:
      return state
  }
}
