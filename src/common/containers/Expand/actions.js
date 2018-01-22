/**
 * Expand actions
 */

import {
  EXPAND_FULL_OPEN,
  EXPAND_FULL_CLOSE,
  EXPAND_FULL_CLOSE_ALL,
} from './constants'

export const open = (name) => ({
  type: EXPAND_FULL_OPEN,
  name,
})

export const close = (name) => ({
  type: EXPAND_FULL_CLOSE,
  name,
})

export const closeAll = () => ({
  type: EXPAND_FULL_CLOSE_ALL,
})

export default open
