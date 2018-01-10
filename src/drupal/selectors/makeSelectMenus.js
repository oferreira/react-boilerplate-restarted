import { createSelector } from 'reselect'
import { selectDrupal } from './index'

/**
 * Select list of menus
 */
const makeSelectMenus = () => createSelector(
  selectDrupal,
  (drupalState) => drupalState.get('menus')
)

export default makeSelectMenus
