import { createSelector } from 'reselect'
import { COOKIE_STORE_NAME } from '../constants'

export const selectCookiePolicy = (state) => state.get(COOKIE_STORE_NAME)

export const makeSelectCookiePolicy = createSelector(
  selectCookiePolicy,
  (state) => state
)
