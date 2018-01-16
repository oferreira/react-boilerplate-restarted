import {
  REQUEST_BOOKING_PROCESS,
  REQUEST_BOOKING_PROCESS_SUCCESS,
  REQUEST_BOOKING_PROCESS_ERROR,
} from '../constants'

// Bookig Process
export const requestBookingProcess = (process, promise) => ({
  type: REQUEST_BOOKING_PROCESS,
  payload: { process, promise },
})

export const requestBookingProcessSuccess = (value) => ({
  type: REQUEST_BOOKING_PROCESS_SUCCESS,
  payload: { value },
})

export const requestBookingProcessError = (error) => ({
  type: REQUEST_BOOKING_PROCESS_ERROR,
  payload: { error },
})
