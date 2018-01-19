import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'

// import { withSearchHotel, withAvailabiltiesHotel } from 'features/Hotels'
import { StayConfigurator } from 'features/Hotels'
// import withPayment from 'features/Payment'
import AppBar from 'components/AppBar'

import QueryBuilder from 'core/utils/urlQueryBuilder'

require('./styles.scss')


export class SearchPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    onSubmit: PropTypes.func,
    location: PropTypes.object.isRequired,
  }

  componentWillMount() {
    console.log('SEARCH PAGE', this.props)
  }

  render() {
    const { location } = this.props
    return (
      <div>
        <AppBar />
        <StayConfigurator
          initialValues={new QueryBuilder(location.search).getQuery()}
        />
      </div>
    )
  }
}

// const enhancers = compose(withSearchHotel, withAvailabiltiesHotel)

export default SearchPage
