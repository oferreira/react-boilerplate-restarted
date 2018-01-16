import { createSelector } from 'reselect'
import selectLanguage from './selectLanguage'

/**
 * Select translations
 */
const makeSelectMessages = () => createSelector(
  selectLanguage,
  (languageState) => languageState.get('messages')
)

export default makeSelectMessages
