import { createSelector } from 'reselect'
import { fromJS } from 'immutable'

import { HOTEL_STORE_NAME } from '../constants'

/**
 * Direct selector to the autocomplete state domain
 */
export const selectAutocompleteDomain = (state) => state.getIn([HOTEL_STORE_NAME, 'autocomplete']) || fromJS({})

export const selectFetching = createSelector(
  selectAutocompleteDomain,
  (state) => state.get('fetchingHotel') || state.get('fetchingPlace')
)

export const selectError = createSelector(
  selectAutocompleteDomain,
  (state) => state.get('error')
)

export const selectResults = createSelector(
  selectAutocompleteDomain,
  (state) => state.get('results')
)

export const selectHotelsPlace = createSelector(
  selectAutocompleteDomain,
  (state) => state.getIn(['results', 'hotels'])
)

export const selectInputValue = createSelector(
  selectAutocompleteDomain,
  (state) => state.getIn(['results', 'rawtext'])
)
