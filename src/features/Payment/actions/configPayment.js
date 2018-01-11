import {
  REQUEST_PAYMENT_CONFIG,
  REQUEST_PAYMENT_CONFIG_SUCCESS,
  REQUEST_PAYMENT_CONFIG_ERROR,
} from '../constants'

// Payment Configuration
export const requestPaymentConfig = (id) => ({
  type: REQUEST_PAYMENT_CONFIG,
  payload: { id },
})

export const requestPaymentConfigSuccess = (value) => ({
  type: REQUEST_PAYMENT_CONFIG_SUCCESS,
  payload: { value },
})

export const requestPaymentConfigError = (error) => ({
  type: REQUEST_PAYMENT_CONFIG_ERROR,
  payload: { error },
})
