import React from 'react'
import PropTypes from 'prop-types'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import hotelReducer from 'features/Hotels/reducers'
import injectReducer from 'core/reducers/utils/injectReducer'
import injectSaga from 'core/sagas/utils/injectSaga'

import {
  requestSearch,
  requestDetails,
} from '../actions'
import {
  HOTEL_STORE_NAME,
  HOTEL_SAGA_NAME,
} from '../constants'
import {} from '../selectors'
import saga from '../sagas'

export default (WrappedComponent) => {
  class SearchHotel extends React.PureComponent {
    static WrappedComponent = WrappedComponent

    static propTypes = {
      onSearch: PropTypes.func.isRequired,
    }

    componentWillMount() {
      const { requestDetails } = this.props
      requestDetails([{ id: 'FRA40267' }, { id: 'FRA42193' }, { id: 'FRA23316' }])
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  const mapStateToProps = createStructuredSelector({

  })

  const mapDispatchToProps = (dispatch) => ({
    onSearch: (location) => dispatch(requestSearch(location)),
    requestDetails: (resortIdList) => dispatch(requestDetails(resortIdList)),
  })

  const withConnect = connect(mapStateToProps, mapDispatchToProps)
  const withReducer = injectReducer({ key: HOTEL_STORE_NAME, reducer: hotelReducer })
  const withSaga = injectSaga({ key: HOTEL_SAGA_NAME, saga })

  return compose(
    withReducer,
    withConnect,
    withSaga,
  )(SearchHotel)
}
