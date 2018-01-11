
import {
  REQUEST_COOKIE_POLICY,
  REQUEST_COOKIE_POLICY_SUCCESS,
} from '../constants'


export const requestCookiePolicy = (locale) => ({
  type: REQUEST_COOKIE_POLICY,
  payload: { locale },
})

export const requestCookiePolicySuccess = (value) => ({
  type: REQUEST_COOKIE_POLICY_SUCCESS,
  payload: { value },
})
