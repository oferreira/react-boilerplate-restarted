import { createSelector } from 'reselect'
import { selectLanguage } from './index'


/**
 * Select the language locale
 */
const makeSelectLocale = () => createSelector(
  selectLanguage,
  (languageState) => languageState.get('locale')
)

export default makeSelectLocale
