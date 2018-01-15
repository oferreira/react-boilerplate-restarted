/*
 *
 * Language reducer
 *
 */
import { fromJS, Map } from 'immutable'
import {
  LANGUAGE_STORE_NAME,
  CHANGE_LOCALE,
  DEFAULT_LOCALE,
  REQUEST_LANGUAGES_SUCCESS,
} from './constants'

const initialState = fromJS({
  locale: DEFAULT_LOCALE,
  languages: {},
  messages: {},
})

function reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LOCALE:
      return state
        .set('locale', action.locale)
    case REQUEST_LANGUAGES_SUCCESS: {
      const {
        languages,
        translations,
      } = action.payload

      return state
        .set('languages', languages)
        .set('messages', new Map(translations))
    }
    default:
      return state
  }
}

export default {
  [LANGUAGE_STORE_NAME]: reducer,
}
