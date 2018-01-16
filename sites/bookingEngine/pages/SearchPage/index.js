import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import { withSearchHotel, withAvailabiltiesHotel } from 'features/Hotels'
import withPayment from 'features/Payment'
import CookiePolicy from 'features/CookiePolicy'
import ContactForm from 'features/ContactForm'

require('./styles.scss')


export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    onSubmit: PropTypes.func,
    unfilteredHotel: PropTypes.func,
  }

  componentWillMount() {
    console.log('SEARCH PAGE', this.props)
  }

  onSubmit = (data) => {
    console.log(data.toJS())
    // const { currency, cart, locale, totalHelper, currencyHelper, hotelCurrency } = this.props
    // const bookingProcess = {
    //   ...(data.toJS()),
    //   currencyHelper,
    //   totalHelper,
    //   cart,
    //   currency,
    //   hotelCurrency,
    //   pspReference: this.props.paymentProvider,
    //   locale,
    // }
    // this.props.onSubmit(bookingProcess)
  }

  render() {
    return (
      <div>
        <h1>
          WBE-SearchPage
        </h1>
        <ContactForm onSubmit={this.onSubmit} />
        <CookiePolicy />
      </div>
    )
  }
}

const enhancers = compose(withSearchHotel, withAvailabiltiesHotel)
// const enhancers = compose(withPayment({ resortCodeKey: 'resortCode' }))

export default enhancers(HomePage)
