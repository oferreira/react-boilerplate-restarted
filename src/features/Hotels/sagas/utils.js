/**
 * Get the minimum room size looked for
 * @param {object} payload The query with rooms occupency
 */
export const getPayloadMinRoomGuests = (payload = {}) => {
  const numberOfAdults = Math.min(...payload.rooms.map((obj) =>
    Object.values(obj).reduce((acc, curr) => parseInt(acc, 10) + parseInt(curr, 10)),
  0))

  return {
    ...payload,
    numberOfAdults: numberOfAdults || 1,
    numberOfChildren: 0,
  }
}
