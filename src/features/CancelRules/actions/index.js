import {
  HOTEL_GET_CANCELLATION_RULES,
  HOTEL_GET_CANCELLATION_RULES_SUCCESS,
  HOTEL_GET_WORDING_RULES,
  HOTEL_GET_WORDING_RULES_SUCCESS,
  HOTEL_GET_RULES_ERROR,
} from '../constants'

export const requestCancelRules = (resortId, rateCode) => ({
  type: HOTEL_GET_CANCELLATION_RULES,
  resortId,
  rateCode,
})

export const requestWordingRules = (key, locale) => ({
  type: HOTEL_GET_WORDING_RULES,
  key,
  locale,
})

export const requestCancelRulesSuccess = (values) => ({
  type: HOTEL_GET_CANCELLATION_RULES_SUCCESS,
  values,
})

export const requestWordingRulesSuccess = (values) => ({
  type: HOTEL_GET_WORDING_RULES_SUCCESS,
  values,
})

export const requestWordingRulesError = (error) => ({
  type: HOTEL_GET_RULES_ERROR,
  error,
})
