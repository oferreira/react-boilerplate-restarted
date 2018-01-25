/* global config */
import { createSelector } from 'reselect'
import { List } from 'immutable'
import { groupBy, getMin, getSum } from 'core/utils/functions'
import { jsonToFormattedRoom } from '../types'
import { ROOM_STORE_NAME } from '../constants'

/**
 * Direct selector to the tripAdvisor state domain
 */
const selectRoomsDomain = () => (state) => state.get(ROOM_STORE_NAME)

export const getRoomsFetching = createSelector(
  selectRoomsDomain(),
  (substate) => substate.get('fetching')
)

export const getRoomsError = createSelector(
  selectRoomsDomain(),
  (substate) => substate.get('error')
)

export const getRooms = createSelector(
  selectRoomsDomain(),
  (substate) => substate.get('roomList')
)

export const getRatePlans = createSelector(
  selectRoomsDomain(),
  (substate) => substate.get('ratePlans')
)

export const makeSelectRatePlansByRoomTypes = createSelector(
  getRatePlans,
  (ratePlans) => groupBy(ratePlans, 'ratePlanCode')
)

export const getRoomsFeatures = createSelector(
  selectRoomsDomain(),
  (substate) => substate.get('roomsFeatures')
)

export const getRoomWithFeatures = createSelector(
  getRooms,
  getRoomsFeatures,
  (rooms, roomsFeatures) => rooms.map((room) => (
    room.set('features', roomsFeatures.filter((r) => r.roomTypeCode === room.roomTypeCode) || [])
  ))
)

export const getRoomsPictures = createSelector(
  selectRoomsDomain(),
  (substate) => substate.getIn(['gallery', 'pictures'])
)

export const getRoomsPicturesFetching = createSelector(
  selectRoomsDomain(),
  (substate) => substate.getIn(['gallery', 'fetching'])
)

/**
 * Return true if the room looked for is available
 * @param {*} roomCapacity Currenct room capacity
 * @param {*} roomSearchCapacity The capacity we are looking for
 */
export const checkRoomCapacity = (roomCapacity, roomSearchCapacity) => {
  const defaultCapacity = { ...config.rooms.min }
  const currentRoomCapacity = [roomCapacity || defaultCapacity]
  const currentRoomSearchCapacity = [roomSearchCapacity || defaultCapacity]

  const currentTotal = getSum(currentRoomCapacity)
  const searchTotal = getSum(currentRoomSearchCapacity)

  return currentTotal >= searchTotal
}

export const makeSelectRoomsByFamily = (cartRooms = [], roomSearch = []) => createSelector(
  getRoomWithFeatures,
  getRoomsPictures,
  (rooms, pictures = {}) => {
    if (rooms) {
      const rows = {}
      const roomsByCategory = {}
      const familySort = {
        Room: 1,
        Suite: 2,
        'Theme suite': 3,
      }
      const sortedRoom = rooms.sort((prev, next) => familySort[prev.roomFamily] - familySort[next.roomFamily])
      sortedRoom.forEach((room) => {
        // Check availabilities to display the room
        const nbSameRoomsInCart = cartRooms.filter((cartRoom) => cartRoom.room.id === room.id).size || 0
        const newAvailability = room.numberOfUnits - nbSameRoomsInCart
        const handledRoom = room
          .set('numberOfUnits', newAvailability)
          .set('mainPicture', (pictures[room.id] || [])[0])

        if (newAvailability > 0 && checkRoomCapacity(room.capacity, roomSearch[cartRooms.size])) {
          const key = room.roomFamily || 'Room'
          rows[key] = rows[key] || []
          rows[key].push(handledRoom)
        }
      })
      // Sort rooms by ratePlan prices desc
      Object.keys(rows).map((k) => (rows[k] = rows[k].sort((a, b) => a.bestPricing.price >= b.bestPricing.price)))

      // Group by room category in an object
      // Family > Category > Bed
      Object.keys(rows).map((family) => (roomsByCategory[family] = groupBy(rows[family], 'roomCategory')))

      return roomsByCategory
    }
    return null
  }
)

export const makeSelectBestPricesByFamily = (cartRooms = [], roomSearch = []) => createSelector(
  makeSelectRoomsByFamily(cartRooms, roomSearch),
  (roomsByFamily) => {
    const items = {}

    Object.keys(roomsByFamily).forEach((key) => {
      items[key] = []
      const roomFamily = roomsByFamily[key]
      // Concat each room in their own families to get array of rooms in each family
      Object.keys(roomFamily).map((subkey) => (
        items[key] = [].concat(items[key], roomFamily[subkey])
      ))
      // Get the min price for each family
      items[key] = getMin(items[key], ['bestPricing', 'price'])
    })

    return items
  }
)

export const getRoomUniqueId = (room) => (`${room.roomTypeCode || room.id || Math.random()}${room.roomCategory}${room.roomFamily}`)

export const getFamilyAvailabilities = (rooms) => rooms.reduce((acc, curr) => (acc + curr.numberOfUnits), 0)

export const getRateFromCodeSorted = (rates = [], rateCode) => rates[rateCode] ? rates[rateCode][0] : {}

export const getRateFromCode = (rates = [], rateCode) => (rates).find((rate) => rate.ratePlanCode === rateCode) || {}

export const formatSelectedRoom = jsonToFormattedRoom

/**
 * Return all rate plans matching to the rate plan code in the selected hotel
 * @param {string} hotelId The hotel Id to looking for
 * @param {string} ratePlanCode The rate plan code to looking for in hotel rate plans
 */
// export const getRatePlansDescription = (hotelId, ratePlanCode) => createSelector(
//   selectGlobal,
//   selectSearch,
//   (stateHotel, stateSearch) => {
//     const hotels = stateSearch.get('hotels')
//     const hotel = hotelId && hotels && hotels.size > 0 ? hotels.find((h) => h.get('id') === hotelId) : stateHotel.get('selected')

//     if (hotel) {
//       return hotel.ratePlans.filter((rate) => (
//         rate.ratePlanCode === ratePlanCode
//       ))
//     }

//     return []
//   }
// )

// export const getSpecialRoomRate = (ratePlanCode, hotelId) => createSelector(
//   getRatePlansDescription(hotelId, ratePlanCode),
//   (ratePlans) => {
//     const ratePlan = ratePlans.find((rate) => rate.isSpecialPlan)
//     return ratePlan ? (ratePlan.description || ratePlan.ratePlanCode) : null
//   }
// )

/**
 * Get the rate plan to compare with
 * @param {List|rray} rateCodes All room rate codes
 * @param {*string ratePlanCode The room rate plan code
 */
// export const getRatePlanComparison = (rateCodes, ratePlanCode) => createSelector(
//   getRatePlansDescription(null, ratePlanCode),
//   (ratePlans) => {
//     const ratePlan = ratePlans.find((rate) => rate.comparedToRate && rate.comparedToRate !== ratePlanCode)
//     return ratePlan ? getRateFromCode(rateCodes, ratePlan.comparedToRate) : null
//   }
// )
