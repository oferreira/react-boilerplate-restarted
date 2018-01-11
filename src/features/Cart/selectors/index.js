import { createSelector } from 'reselect'

/**
 * Direct selector to the tripAdvisor state domain
 */
const selectHotelsDomain = () => (state) => state.get('cart')

/**
 * Other specific selectors
 */
export const getCart = createSelector(
  selectHotelsDomain(),
  (substate) => substate.get('hotels')
)
