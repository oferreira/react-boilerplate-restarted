import { fromJS } from 'immutable'
import { createSelector } from 'reselect'

import { HOTEL_STORE_NAME } from '../constants'

/**
 * Direct selector to the tripAdvisor state domain
 */
const selectAvailabilitiesHotelDomain = (state) => state.getIn([HOTEL_STORE_NAME, 'availabilities']) || fromJS({})

export const getLoading = createSelector(
  selectAvailabilitiesHotelDomain,
  (avblts) => avblts.get('fetching'),
)

export const getMapLoading = createSelector(
  selectAvailabilitiesHotelDomain,
  (avblts) => avblts.get('fetchingMap'),
)

export const getHotels = createSelector(
  selectAvailabilitiesHotelDomain,
  (avblts) => avblts.get('results')
)

export const getHotelById = (id) => createSelector(
  selectAvailabilitiesHotelDomain,
  (avblts) => avblts.get('hotels').toJS().find((hotel) => hotel.id === id)
)

/**
 * Sort rate plans of each hotels by special price and rank
 * @param {[Hotels]} hotels Array of hotels get from API and merge with availabilities and rate plans
 */
export const filterAndSortHotels = (hotels) => {
  const listHotelComplete = []

  hotels.forEach((h) => {
    const newHotel = { ...h }
    if (h && h.ratePlans) {
      newHotel.ratePlans = h.ratePlans
        .filter((rate) => (rate.visibility !== 'NEVER')) // Default, remove rate plans with 'NEVER' visibility
        .sort((a, b) => {
          // Check if there is a special price
          if (a.isSpecialPlan && !b.isSpecialPlan) return -1
          if (!a.isSpecialPlan && b.isSpecialPlan) return 1
          // Else sort by rank
          return a.rank - b.rank
        })
    }
    listHotelComplete.push({ ...newHotel })
  })

  return listHotelComplete
}
