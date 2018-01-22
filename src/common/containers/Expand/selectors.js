/**
 * Expand selectors
 */

import { createSelector } from 'reselect'

const selectExpand = (state) => state.get('expands')

const makeIsOpen = (state, name) => createSelector(
  selectExpand,
  (expand) => expand.get(name),
)

export {
  makeIsOpen,
}
