import { createSelector } from 'reselect'
import { selectLanguage } from './index'

/**
 * Select translations
 */
const makeSelectMessages = () => createSelector(
  selectLanguage,
  (languageState) => languageState.get('messages')
)

export default makeSelectMessages
