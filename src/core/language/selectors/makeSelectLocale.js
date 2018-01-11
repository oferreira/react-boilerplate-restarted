import { createSelector } from 'reselect'
import selectLanguage from './selectLanguage'

/**
 * Select the language locale
 */
const makeSelectLocale = () => createSelector(
  selectLanguage,
  (languageState) => languageState.get('locale')
)

export default makeSelectLocale
