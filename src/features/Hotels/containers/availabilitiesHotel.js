import React from 'react'
import PropTypes from 'prop-types'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import hotelReducer from 'features/Hotels/reducers'
import injectReducer from 'core/reducers/utils/injectReducer'
// import injectSaga from 'core/sagas/utils/injectSaga'

import { makeSelectLocale } from 'core/language/selectors'

import { availabilitiesRequest } from '../actions'
import { HOTEL_STORE_NAME } from '../constants'
import { getLoading, getMapLoading, getHotels } from '../selectors'
// import saga from '../sagas'

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

      onGetAvailabilities(location.query, locale)
    }

    componentWillReceiveProps(props) {
      const {
        onGetAvailabilities,
        locale,
        location,
      } = this.props

      if (props.locale !== locale) {
        onGetAvailabilities(location.query, locale)
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

  const mapStateToProps = createStructuredSelector({
    loading: getLoading,
    mapLoading: getMapLoading,
    unfilteredHotel: getHotels,
    locale: makeSelectLocale(),
  })

  const mapDispatchToProps = (dispatch) => ({
    onGetAvailabilities: (query, locale) => dispatch(availabilitiesRequest(query, locale)),
  })

  const withConnect = connect(mapStateToProps, mapDispatchToProps)
  const withReducer = injectReducer({ key: HOTEL_STORE_NAME, reducer: hotelReducer })
  // const withSaga = injectSaga({ key: HOTEL_STORE_NAME, saga })

  return compose(
    withReducer,
    withConnect,
  )(AvailabiltiesHotel)
}
