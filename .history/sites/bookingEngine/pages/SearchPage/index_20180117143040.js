import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'

// import { withSearchHotel, withAvailabiltiesHotel } from 'features/Hotels'
import { StayConfigurator } from 'features/Hotels'
// import withPayment from 'features/Payment'

require('./styles.scss')


export class SearchPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    onSubmit: PropTypes.func,
    unfilteredHotel: PropTypes.array,
  }

  componentWillMount() {
    console.log('SEARCH PAGE', this.props)
  }

  render() {
    return (
      <div>
        <h1>
          WBE-SearchPage
        </h1>
        <div>
          <StayConfigurator />
        </div>
      </div>
    )
  }
}

// const enhancers = compose(withSearchHotel, withAvailabiltiesHotel)

export default SearchPage
