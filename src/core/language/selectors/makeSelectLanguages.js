import { createSelector } from 'reselect'
import selectLanguage from './selectLanguage'

/**
 * Select languages
 */
const makeSelectLanguages = () => createSelector(
  selectLanguage,
  (languageState) => languageState.get('languages')
)

export default makeSelectLanguages
