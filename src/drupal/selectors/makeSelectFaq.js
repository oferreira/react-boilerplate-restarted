import { createSelector } from 'reselect'
import { selectDrupal } from './index'

/**
 * Select list of faq
 */
const makeSelectFaq = () => createSelector(
  selectDrupal,
  (drupalState) => drupalState.get('faq')
)

export default makeSelectFaq
