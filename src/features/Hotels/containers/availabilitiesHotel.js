import React from 'react'
import PropTypes from 'prop-types'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import hotelReducer from 'features/Hotels/reducers'
import injectReducer from 'core/reducers/utils/injectReducer'
import injectSaga from 'core/sagas/utils/injectSaga'

import { makeSelectLocale } from 'core/language/selectors'

import {
  requestAvailabilities,
} from '../actions'

import {
  HOTEL_STORE_NAME,
  HOTEL_SAGA_NAME,
} from '../constants'

import {
  getLoading,
  getMapLoading,
  getHotels,
} from '../selectors'

import saga from '../sagas'

const AVAILABILITIES_REQUEST_PAYLOAD = {
  arrival: '2018-01-20T00:00:00',
  departure: '2018-01-21T00:00:00',
  location: 'Paris',
  rateCode: 'Unknown company',
  'rooms[0][adult]': '1',
  'rooms[0][child]': '0',
  rooms: [
    {
      adult: '1',
      child: '0',
    },
  ],
  numberOfAdults: 1,
  numberOfChildren: 0,
}

export default (WrappedComponent) => {
  class AvailabiltiesHotel extends React.PureComponent {
    static WrappedComponent = WrappedComponent

    static propTypes = {
      onGetAvailabilities: PropTypes.func.isRequired,
      locale: PropTypes.string.isRequired,
      location: PropTypes.object.isRequired,
    }

    state = {
      selectedHotel: null,
      focusedHotel: null,
    }

    componentWillMount() {
      const {
        onGetAvailabilities,
        locale,
        location,
      } = this.props

      onGetAvailabilities(AVAILABILITIES_REQUEST_PAYLOAD, 'en-us')
    }

    componentWillReceiveProps(props) {
      const {
        onGetAvailabilities,
        locale,
        location,
      } = this.props

      if (props.locale !== locale) {
        onGetAvailabilities(AVAILABILITIES_REQUEST_PAYLOAD, 'en-us')
      }
    }

    onSelectHotel = (selectedHotel) => {
      this.setState({ selectedHotel })
    }

    onFocusHotel = (focusedHotel) => {
      this.setState({ focusedHotel })
    }

    render() {
      const customProps = {
        onSelectItem: this.onSelectItem,
        onFocusHotel: this.onFocusHotel,
        ...this.state,
      }

      return <WrappedComponent {...this.props} {...customProps} />
    }
  }

  const mapStateToProps = (state) => (createStructuredSelector({
    loading: getLoading,
    mapLoading: getMapLoading,
    unfilteredHotel: getHotels,
    locale: makeSelectLocale(),
  }))

  const mapDispatchToProps = (dispatch) => ({
    onGetAvailabilities: (query, locale) => dispatch(requestAvailabilities(query, locale)),
  })

  const withConnect = connect(mapStateToProps, mapDispatchToProps)
  const withReducer = injectReducer({ key: HOTEL_STORE_NAME, reducer: hotelReducer })
  const withSaga = injectSaga({ key: HOTEL_SAGA_NAME, saga })

  return compose(
    withReducer,
    withConnect,
  )(AvailabiltiesHotel)
}
