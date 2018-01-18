import moment from 'moment'
import { Record } from 'immutable'
import { DESKTOP, MOBILE, TABLET } from './constants/devices'
import { PAYMENT_PROVIDER_ADYEN } from './constants'

/**
 * Get the device type of the user according to the user agent of the navigator
 */
export const getDevice = () => {
  const userAgent = navigator.userAgent.toLowerCase()

  if (/(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent)) {
    return TABLET
  } else if (/(mobi|ipod|phone|blackberry|opera mini|fennec|minimo|symbian|psp|nintendo ds|archos|skyfire|puffin|blazer|bolt|gobrowser|iris|maemo|semc|teashark|uzard)/.test(userAgent)) {
    return MOBILE
  }

  return DESKTOP
}

export const Result = Record({
  success: false,
  message: '',
  status: null,
  reservationId: '',
  confirmationNumber: '',
})


export const Profile = Record({
  gender: 0,
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  currency: '',
  country: '',
  locale: '',
  device: DESKTOP,
})

export const Payment = Record({
  paymentMethod: '',
  cardHolderName: '',
  cardNumber: '',
  expirationDate: '',
})

export const Reservation = Record({
  rooms: [],
  profile: {},
  newsletter: '',
  comments: '',
  arrivalTime: '',
  payment: new Payment(),
})


export const BookingProcess = Record({
  pspReference: 1,
  hotelReservation: new Reservation(),
})

export const jsonToResult = (j) => (new Result(j))

export const formToProfile = (x) => {
  const data = {}
  const phoneCode = x.phoneCode.substring(x.phoneCode.indexOf('(') + 1, x.phoneCode.indexOf(')'))
  data.gender = x.gender
  data.firstName = x.firstName
  data.lastName = x.lastName
  data.email = x.email
  data.phoneNumber = `${phoneCode}${x.phone}`
  data.currency = x.currency
  data.country = x.country
  data.locale = x.locale
  data.device = getDevice()
  return new Profile(data)
}

export const formToPayment = (x) => {
  const data = {}
  // data.guaranteeType = '' // delete hotelReservation.payment.guaranteeType ?????
  data.paymentMethod = x.cardCode
  data.cardHolderName = x.cardHolderName
  data.cardNumber = x.cardNumber
  data.expirationDate = moment(`${x.year}-${x.month}-01`).utc().format()
  return new Payment(data)
}

export const cartOptionsToPackages = (x, options) => options.map((v) => {
  const { currencyHelper } = x

  const result = {
    packageCode: v.id,
    total: {
      price: currencyHelper.calc({ price: v.pricing.price, currency: v.pricing.currency, to: v.pricing.currency }).ttc,
      currency: v.pricing.currency,
    },
  }

  return result
})

export const cartToRooms = (x) => x.cart.map((v) => {
  const { currencyHelper } = x

  const result = {
    resortId: v.hid,
    roomType: v.room.roomTypeCode,
    startDate: v.dateStart,
    endDate: v.dateEnd,
    adultCount: v.nbAdult,
    childCount: v.nbChild,
    rateCode: v.ratePlan.ratePlanCode,
    packages: cartOptionsToPackages(x, v.options),
    total: {
      price: currencyHelper.calc({ price: v.ratePlan.totalRate, currency: v.ratePlan.currencyCode, to: v.ratePlan.currencyCode }).ttc,
      currency: v.ratePlan.currencyCode,
    },
  }

  return result
})

export const cartToReservation = (x) => {
  const data = {}

  const { currencyHelper, totalHelper } = x
  const roomWithCode = x.cart.find((room) => (room.specialCodeType && room.specialCodeValue)) || {}

  const isRatePlanInBooking = x.cart.find((roomCart) => roomCart.ratePlan.isSpecialPlan)

  data.total = {
    price: currencyHelper.calc({ price: totalHelper.ttc, currency: x.currency, to: x.hotelCurrency }).ttc,
    currency: x.hotelCurrency,
  }

  data.rooms = cartToRooms(x)
  if (x.pspReference !== PAYMENT_PROVIDER_ADYEN) data.payment = formToPayment(x)
  data.profile = formToProfile(x)
  data.comments = x.comment || ''
  data.arrivalTime = x.arrivalTime || ''
  data.newsletter = x.newsletter || false
  data.sourceProfileCode = x.sourceProfileCode

  // Add special code to the process booking only if there is a special rateplan in the cart
  if (isRatePlanInBooking) {
    data.specialCodeType = roomWithCode.specialCodeType || ''
    data.specialCodeValue = roomWithCode.specialCodeValue || ''
  }

  return data
}

export const createBookingProcess = (x) => {
  const data = {}
  data.pspReference = x.pspReference
  data.hotelReservation = cartToReservation(x)
  return new BookingProcess(data)
}
