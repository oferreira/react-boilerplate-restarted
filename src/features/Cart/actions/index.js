/*
 *
 * Cart actions
 *
 */

import {
  CART_ADD_ROOM,
} from '../constants'

export function cartAddRoom(id, room) {
  return {
    type: CART_ADD_ROOM,
    payload: { id, room },
  }
}
