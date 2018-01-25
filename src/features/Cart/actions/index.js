/*
 *
 * Cart actions
 *
 */

import {
  CART_INIT,
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_UPDATE_ITEM,
  CART_EMPTY,
} from '../constants'

export const cartInit = (type) => ({
  type: CART_INIT,
  payload: { type },
})

export const cartAddItem = (type, item, quantity, options) => ({
  type: CART_ADD_ITEM,
  payload: {
    type,
    item,
    quantity,
    options,
  },
})

export const cartRemoveItem = (type, index) => ({
  type: CART_REMOVE_ITEM,
  payload: { type, index },
})

export const cartUpdateItem = (type, index, item, quantity, options) => ({
  type: CART_UPDATE_ITEM,
  payload: {
    type,
    item,
    quantity,
    options,
  },
})

export const cartEmpty = (type) => ({
  type: CART_EMPTY,
  payload: { type },
})
