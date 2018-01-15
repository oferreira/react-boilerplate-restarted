import { createSelector } from 'reselect'
import { selectLanguage } from './index'

/**
 * Select languages
 */
const makeSelectLanguages = () => createSelector(
  selectLanguage,
  (languageState) => languageState.get('languages')
)

export default makeSelectLanguages
