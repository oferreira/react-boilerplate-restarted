import { createSelector } from 'reselect'
import { selectDrupal } from './index'

/**
 * Select the list on nodes
 */
const makeSelectNodes = () => createSelector(
  selectDrupal,
  (drupalState) => drupalState.get('nodes')
)

export default makeSelectNodes
