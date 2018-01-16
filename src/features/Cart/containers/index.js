import React from 'react'
import PropTypes from 'prop-types'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import injectReducer from 'core/reducers/utils/injectReducer'
// import injectSaga from 'core/sagas/utils/injectSaga'

import { cartAddRoom } from '../actions'
import { getCart } from '../selectors'
import reducer from '../reducers'
// import saga from '../sagas'

function WithCart(WrappedComponent) {
  class Hotels extends React.PureComponent {
    componentWillMount() {
      this.props.onAddRoom('toto', { myRoom: 'fromToto' })
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  const mapStateToProps = createStructuredSelector({
    cart: getCart,
  })

  const mapDispatchToProps = (dispatch) => ({
    onAddRoom: (id, room) => dispatch(cartAddRoom(id, room)),
  })

  const withConnect = connect(mapStateToProps, mapDispatchToProps)

  const withReducer = injectReducer({ key: 'cart', reducer })
  // const withSaga = injectSaga({ key: 'tripAdvisor', saga })

  return compose(
    withReducer,
    withConnect,
  )(Hotels)
}

export default WithCart
