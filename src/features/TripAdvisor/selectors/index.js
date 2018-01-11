import { createSelector } from 'reselect'

/**
 * Direct selector to the tripAdvisor state domain
 */
const selectTripAdvisorDomain = () => (state) => state.get('tripAdvisor')

/**
 * Other specific selectors
 */
export const selectTripAdvisor = (id) => createSelector(
  selectTripAdvisorDomain(),
  (substate) => substate.getIn(['ratings', id])
)

export const selectTripAdvisorRatings = () => createSelector(
  selectTripAdvisorDomain(),
  (substate) => substate.get('ratings')
)

export const selectTripAdvisorRating = (id) => createSelector(
  selectTripAdvisor(id),
  (substate) => substate && parseFloat(substate.rating.rating) > 3 ? substate.rating : null // Only get rate if it's more than 3/5
)

export const selectTripAdvisorFetching = (id) => createSelector(
  selectTripAdvisor(id),
  (substate) => substate ? substate.fetching : false
)

export const selectTripAdvisorError = (id) => createSelector(
  selectTripAdvisor(id),
  (substate) => substate ? substate.error : false
)

/**
 * Default selector used by TripAdvisor
 */

export const makeSelectTripAdvisor = () => createSelector(
  selectTripAdvisorDomain(),
  (substate) => substate.toJS()
)
