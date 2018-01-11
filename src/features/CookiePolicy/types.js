import { Record } from 'immutable'

/* ***********************
 * Cookie Policy
 * *********************** */
export const CookiePolicy = Record({
  title: null,
  label: null,
  body: null,
})

export const jsonToCookiePolicy = (json) => (new CookiePolicy(json))
