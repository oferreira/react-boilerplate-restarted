import { createSelector } from 'reselect'
import { PAYMENT_STORE_NAME } from '../constants'
import { PAYMENT_PROVIDER_OPERA } from '../constants/providers'

export const selectPayment = (state) => state.get(PAYMENT_STORE_NAME)

export const selectPaymentConfig = createSelector(
  selectPayment,
  (state) => state.get('config')
)

export const selectPaymentConfigFetching = createSelector(
  selectPayment,
  (state) => state.get('fetchingConfig')
)

export const selectPaymentProvider = createSelector(
  selectPaymentConfig,
  (state) => (
    typeof state.paymentMethods !== 'undefined' && typeof state.paymentMethods[0] !== 'undefined' && typeof state.paymentMethods[0].paymentServiceProvider !== 'undefined'
      ? state.paymentMethods[0].paymentServiceProvider
      : PAYMENT_PROVIDER_OPERA
  )
)

export const selectPaymentTypes = createSelector(
  selectPaymentConfig,
  (state) => (
    typeof state.paymentMethods !== 'undefined' && typeof state.paymentMethods[0] !== 'undefined' && typeof state.paymentMethods[0].paymentTypes !== 'undefined'
      ? state.paymentMethods[0].paymentTypes
      : []
  )
)

export const selectIsRequesting = createSelector(
  selectPayment,
  (state) => state.get('requesting'),
)
