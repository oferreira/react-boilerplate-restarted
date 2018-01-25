import { createSelector } from 'reselect'
import { CART_STORE_NAME } from '../constants'

/**
 * Direct selector to the tripAdvisor state domain
 */
const selectHotelsDomain = () => (state) => state.get(CART_STORE_NAME)

export const getCart = (type) => createSelector(
  selectHotelsDomain(),
  (substate) => substate.get(type)
)

export const getCartFromIndex = (type, index) => createSelector(
  selectHotelsDomain(),
  (substate) => substate.getIn([type, index])
)

export const getCartItemFromParamValue = (type, param, value) => createSelector(
  selectHotelsDomain(),
  (substate) => substate.getIn(type).find((item) => item.get ? item.get(param) === value : item[param] === value)
)
