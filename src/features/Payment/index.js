import React from 'react'
import PropTypes from 'prop-types'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import reducer from 'features/Payment/reducers'
import saga from 'features/Payment/sagas'
import injectReducer from 'core/reducers/utils/injectReducer'
import injectSaga from 'core/sagas/utils/injectSaga'

// Selectors
import { makeSelectLocale } from 'core/language/selectors'

import { createBookingProcess } from './types'
import {
  requestBookingProcess,
  requestPaymentConfig,
} from './actions'
import { PAYMENT_STORE_NAME } from './constants'
import { PAYMENT_PROVIDER_ADYEN, PAYMENT_PROVIDER_OPERA } from './constants/providers'
import {
  selectPaymentProvider,
} from './selectors'

export default ({ resortCodeKey }) => (WrappedComponent) => {
  class Payment extends React.PureComponent {
    static WrappedComponent = WrappedComponent

    static propTypes = {
      onRequestPaymentConfig: PropTypes.func.isRequired,
      onRequestBookingProcess: PropTypes.func.isRequired,
      locale: PropTypes.string.isRequired,
      paymentProvider: PropTypes.number,
    }

    componentWillMount() {
      const { onRequestPaymentConfig } = this.props
      onRequestPaymentConfig('FRA46565')
      // if (!resortCodeKey || !this.props[resortCodeKey]) {
      //   console.error('(Core/Payment...) Invalid options keys for HOC')
      // } else {
      //   onRequestPaymentConfig(this.props[resortCodeKey])
      // }
    }

    componentWillReceiveProps(props) {
      const {
        locale,
        onRequestPaymentConfig,
      } = this.props

      if (props.locale !== locale) {
        onRequestPaymentConfig(this.props[resortCodeKey])
      }
    }

    onSubmitPayment = (bookingProcess) => {
      const { onRequestBookingProcess } = this.props
      onRequestBookingProcess(bookingProcess)
    }

    render() {
      const customProps = {
        onSubmit: this.onSubmitPayment,
        isAdyen: this.props.paymentProvider === PAYMENT_PROVIDER_ADYEN,
        isOpera: this.props.paymentProvider === PAYMENT_PROVIDER_OPERA,
        ...this.props,
      }

      return <WrappedComponent {...customProps} />
    }
  }

  const mapStateToProps = createStructuredSelector({
    locale: makeSelectLocale(),
    paymentProvider: selectPaymentProvider,
  })

  const mapDispatchToProps = (dispatch) => ({
    onRequestPaymentConfig: (id) => dispatch(requestPaymentConfig(id)),
    onRequestBookingProcess: (bookingProcess, promise) => dispatch(requestBookingProcess(createBookingProcess(bookingProcess, promise))),
  })

  const withConnect = connect(mapStateToProps, mapDispatchToProps)
  const withReducer = injectReducer({ key: PAYMENT_STORE_NAME, reducer })
  const withSaga = injectSaga({ key: PAYMENT_STORE_NAME, saga })

  return compose(
    withReducer,
    withSaga,
    withConnect,
  )(Payment)
}
