import {
  REQUEST_PAYMENT_CONFIRMATION,
  REQUEST_PAYMENT_CONFIRMATION_SUCCESS,
  REQUEST_PAYMENT_CONFIRMATION_ERROR,
} from '../constants'

// Payment Confirmation
export const requestPaymentConfirmation = (params, promise) => ({
  type: REQUEST_PAYMENT_CONFIRMATION,
  payload: { params, promise },
})

export const requestPaymentConfirmationSuccess = (value) => ({
  type: REQUEST_PAYMENT_CONFIRMATION_SUCCESS,
  payload: { value },
})
export const requestPaymentConfirmationError = (error) => ({
  type: REQUEST_PAYMENT_CONFIRMATION_ERROR,
  payload: { error },
})
