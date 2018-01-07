import { createSelector } from 'reselect'
import { selectDrupal } from './index'

/**
 * Select the language locale
 */
const makeSelectNodes = () => createSelector(
  selectDrupal,
  (drupalState) => drupalState.get('nodes')
)

export default makeSelectNodes
