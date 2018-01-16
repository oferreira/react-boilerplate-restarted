import React from 'react'
import PropTypes from 'prop-types'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import hotelReducer from 'features/Hotels/reducers'
import injectReducer from 'core/reducers/utils/injectReducer'
// import injectSaga from 'core/sagas/utils/injectSaga'

import { requestSearch } from '../actions'
import { HOTEL_STORE_NAME } from '../constants'
import {} from '../selectors'
// import saga from '../sagas'

export default (WrappedComponent) => {
  class SearchHotel extends React.PureComponent {
    static WrappedComponent = WrappedComponent

    static propTypes = {
      onSearch: PropTypes.func.isRequired,
    }

    componentWillMount() {

    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  const mapStateToProps = createStructuredSelector({

  })

  const mapDispatchToProps = (dispatch) => ({
    onSearch: (location) => dispatch(requestSearch(location)),
  })

  const withConnect = connect(mapStateToProps, mapDispatchToProps)
  const withReducer = injectReducer({ key: HOTEL_STORE_NAME, reducer: hotelReducer })
  // const withSaga = injectSaga({ key: HOTEL_STORE_NAME, saga })

  return compose(
    withReducer,
    withConnect,
  )(SearchHotel)
}
