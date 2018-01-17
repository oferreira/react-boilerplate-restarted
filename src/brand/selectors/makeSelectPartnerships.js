import { createSelector } from 'reselect'
import selectBrand from './index'

/**
 * Select Partnerships
 */
const makeSelectPartnerships = () => createSelector(
  selectBrand,
  (PartnershipState) => PartnershipState.get('partnerships')
)

export default makeSelectPartnerships
