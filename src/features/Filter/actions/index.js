import {
  ADD_FILTER,
  INIT_FILTER,
  REMOVE_FILTER,
  UPDATE_FILTER,
  APPLY_FILTER,
  RESET_FILTER,
  TOGGLE_FILTER,
} from './constants'

export const initFilter = (name, key, rule) => ({
  type: INIT_FILTER,
  name,
  key,
  rule,
})


export const addFilter = (name, key, filter) => ({
  type: ADD_FILTER,
  name,
  key,
  filter,
})

export const removeFilter = (name, key, filter) => ({
  type: REMOVE_FILTER,
  name,
  key,
  filter,
})

export const updateFilter = (name, key, filter) => ({
  type: UPDATE_FILTER,
  name,
  key,
  filter,
})

export const toggleFilter = (name, key, filter) => ({
  type: TOGGLE_FILTER,
  name,
  key,
  filter,
})

export const resetFilter = (name) => ({
  type: RESET_FILTER,
  name,
})


export const applyFilter = (name) => ({
  type: APPLY_FILTER,
  name,
})

