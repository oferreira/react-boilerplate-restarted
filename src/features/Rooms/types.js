/* global config */
import { Record, List } from 'immutable'
import { getMin } from 'core/utils/functions'
import { correctPictureUri } from 'core/utils/pictures'

import { DEFAULT } from './constants/ratePlans'

/* ***********************
 * Pricing items
 * *********************** */
export const Total = Record({
  ht: 0,
  ttc: 0,
  vat: 0,
})

export const Pricing = Record({
  price: 0,
  currency: null,
  to: null,
  rateCode: null,
  vat: 0,
})

export const BestPricing = Record({
  price: 0,
  currency: '',
  rateCode: '',
  vat: 0,
})

/* ***********************
 * Features
 * *********************** */
export const Feature = Record({
  roomTypeCode: null,
  roomCategoryCode: null,
  roomCategoryFeature: null,
})
export const jsonToFeatures = (json) => (new List(
  json.map((ftr) => new Feature(ftr))
))

/* ***********************
 * Rooms
 * *********************** */
export const Room = Record({
  id: null,
  roomDescription: null,
  roomTypeCode: null,
  roomCategory: null,
  roomCategoryTitle: null,
  roomFamily: null,
  bedTypeList: [],
  bedType: '',
  subBedroomCount: 0,
  numberOfUnits: 1,
  surface: 0,
  sequence: 0,
  brandcode: null,
  capacity: { ...config.rooms.min },
  rateCodes: [],
  bestPricing: new BestPricing(),
  mainPicture: {},
  packages: [],
  features: [],
})

/* ***********************
 * Rate Code (= Room Rate codes)
 * *********************** */
export const RateCode = Record({
  ratePlanCode: '',
  baseRate: 0,
  averageRate: 0,
  totalRate: 0,
  totalTaxes: 0,
  currencyCode: '',
})

export const jsonToRateCode = (json) => (new List(
  json.map((rate) => new RateCode(rate))
))

/* ***********************
 * Rate plans
 * *********************** */
export const RatePlan = Record({
  name: '',
  shortDescription: '',
  description: '',
  bulletPoints: null,
  rank: 0,
  ratePlanCode: '',
  isSpecialPlan: false,
  guaranteeType: '',
  isPayment: true,
  resortCode: null,
  rateTheme: null,
  cancellationRule: null,
  isCancellable: false,
  isVatIncluded: false,
  taxesCharges: 0,
  comparedToRate: null,
  pictureUri: '',
  pictureDescription: '',
  title: '',
  isPublishable: true,
  visibility: DEFAULT,
  includedPackageList: [],
})
export const jsonToRatePlans = (json) => new List(
  json.map((rate) => new RatePlan(rate))
)

export const ratePlanToBestPricing = (rp) => new BestPricing({
  price: rp.averageRate || rp.baseRate,
  currency: rp.currencyCode,
  rateCode: rp.ratePlanCode,
  vat: 0,
})

/* ***********************
 * Bed Type
 * *********************** */
export const BedType = Record({
  code: null,
  quantity: null,
})
export const jsonToBedTypes = (json) => new List(
  json.map((rate) => new BedType(rate))
)

/* ***********************
 * Global Json To Rooms
 * *********************** */
export const jsonToRooms = (json) => (new List(json.map((data) => {
  const room = { ...data }

  room.id = data.roomTypeCode
  room.capacity = data.capacity || {
    adult: data.numberOfAdults,
    child: data.numberOfChildren,
  }

  room.bedTypeList = jsonToBedTypes(data.bedTypeList)

  const rateCodes = room.roomRateList || room.rateCodes || []
  room.rateCodes = jsonToRateCode(rateCodes)
  room.bestPricing = ratePlanToBestPricing(getMin(rateCodes, 'averageRate') || {})

  return new Room(room)
})))

export const jsonToSortedPictures = (pictures = []) => {
  const pictureByRoom = {
    all: [],
  }

  const pictureByRoomSorted = {}

  pictures.map((itemPicture) => {
    const picture = { ...itemPicture, url: correctPictureUri(itemPicture.url, 'L') }
    const { roomType } = picture
    pictureByRoom.all.push(picture)
    pictureByRoom[roomType] = pictureByRoom[roomType] || []
    pictureByRoom[roomType].push(picture)
    return true
  })

  // Sort each picture by ordinal
  Object.keys(pictureByRoom).map((key) => {
    pictureByRoomSorted[key] = pictureByRoom[key].sort((a, b) => parseInt(a.ordinal, 10) >= parseInt(b.ordinal, 10))
    return true
  })

  return pictureByRoomSorted
}

/* ***********************
 * Formatted Room to set to a cart
 * *********************** */
export const FormattedRoom = new Record({
  resortCode: null,
  room: null,
  nbChild: 0,
  nbAdult: 0,
  dateStart: null,
  dateEnd: null,
  // options: new List(),
  ratePlan: null,
  specialCodeType: null,
  specialCodeValue: null,
})
export const jsonToFormattedRoom = (room, ratePlan, search = {}) => (
  new FormattedRoom({
    ...search,
    dateStart: search.arrivalDate,
    endDate: search.departureDate,
    room,
    ratePlan,
  })
)

/* ***********************
 * Query to get rooms availabilities
 * *********************** */
export const payloadToQueryAvailability = (payload) => {
  const {
    resortCode,
    arrival,
    departure,
    rooms,
    rateCode,
    rateType,
    locale,
    numberOfAdults,
    numberOfChildren,
  } = payload

  return {
    resortIdList: [resortCode],
    specialCodeType: rateType && rateCode ? rateType : '',
    specialCodeValue: rateType && rateCode ? rateCode.trim() : '',
    roomOccupancyList: rooms.map((room) => ({ ...config.rooms.min, ...room })) || [],
    numberOfRooms: rooms.length || 1,
    numberOfAdults: numberOfAdults || rooms.reduce((adults, c) => parseInt(c.adult, 10) + parseInt(adults, 10), 0) || config.rooms.min.adult,
    numberOfChildren: numberOfChildren || rooms.reduce((children, c) => parseInt(c.child, 10) + parseInt(children, 10), 0) || config.rooms.min.child,
    startDate: arrival,
    endDate: departure,
    locale,
  }
}
