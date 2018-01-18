import { Record, List } from 'immutable'
import { correctPictureUri } from 'core/utils/pictures'
import { RATE_PLAN_VISIBILITY_DEFAULT } from '../constants'

/* ***********************
 * Room Search - Rooms in the URI
 * *********************** */
export const RoomSearch = Record({
  ...config.rooms.min,
})
export const jsonToRoomSearch = (rooms) => (
  new List(
    rooms.map((r) => {
      const room = { ...r } // Duplicate object to work with
      Object.keys(room).map((key) => (
        room[key] = isNaN(room[key]) ? config.rooms.min[key] : room[key] // Check if the value is a number else add the min value
      ))
      return new RoomSearch(room)
    })
  )
)

export const jsonToHotel = (data) => {
  const hotel = { ...data }

  hotel.id = hotel.id || data.resortId
  hotel.rooms = new List()
  hotel.bestPricing = new BestPricing({
    price: data.rooms ? (data.rooms.averageRate || data.rooms.baseRate || 0) : 0,
    currency: data.rooms ? data.rooms.currencyCode : null,
    rateCode: data.rooms ? data.rooms.ratePlanCode : null,
    vat: 0,
  })
  hotel.ratePlans = jsonToRatePlans([data.ratePlans] || [])
  hotel.packages = jsonToPackages(data.packages || data.options || [])
  hotel.amenityList = data.amenityList || []
  hotel.mainPicture = correctPictureUri(data.mainPicture, 'XL')
  return new Hotel(hotel)
}

export const jsonToHotels = (hotels) => new List(hotels.map(jsonToHotel))

/* ***********************
 * Location
 * *********************** */
export const Location = Record({
  lng: 0,
  lat: 0,
  types: [],
  country: null,
})
export const jsonToLocation = (json) => (new Location(json))

export const BestPricing = Record({
  price: 0,
  currency: '',
  rateCode: '',
  vat: 0,
})

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
  isCancellable: false,
  isVatIncluded: false,
  taxesCharges: 0,
  comparedToRate: null,
  pictureUri: '',
  pictureDescription: '',
  visibility: RATE_PLAN_VISIBILITY_DEFAULT,
  includedPackageList: [],
})
export const jsonToRatePlans = (json) => new List(
  json.map((rate) => new RatePlan(rate))
)

export const jsonToPackages = (json) => (new List(json.map((data) => (
  new Package({
    ...data,
    id: data.id || data.packageCode || '',
    name: data.name || data.title,
    pricing: data.pricing || new Pricing({
      price: data.price,
      currency: data.currency,
      vat: data.vat || 0,
      to: 0,
    }),
  })
))))

export const Hotel = Record({
  id: null,
  name: null,
  description: null,
  directionDescription: null,
  chainCode: null,
  brandcode: null,
  brandName: null,
  isReservable: true,
  country: null,
  address: null,
  city: null,
  cityTax: null,
  cityTaxType: null,
  zipCode: null,
  telephone: null,
  fax: null,
  latitude: 0,
  longitude: 0,
  email: null,
  website: null,
  stars: '',
  pictures: [],
  amenityList: [],
  location: '',
  mainPicture: '',
  rooms: new List(),
  options: null,
  packages: null,
  upgrades: null,
  bestPricing: new BestPricing(),
  ratePlans: new List(),
  startDate: new Date(), // Optional date according to alternative dates
  endDate: new Date(), // Optional date
})
