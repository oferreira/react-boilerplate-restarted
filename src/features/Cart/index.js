import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import injectReducer from 'core/reducers/utils/injectReducer'

import { cartInit, cartAddItem, cartRemoveItem, cartUpdateItem, cartEmpty } from './actions'
import { getCart, getCartFromIndex, getCartItemFromParamValue } from './selectors'
import reducer from './reducers'
import { CART_STORE_NAME } from './constants'

export default ({ type }) => (WrappedComponent) => {
  if (!type || !_.isString(type) || _.isEmpty(_.trim(type))) {
    return console.error('(HOC/Cart...) Error: Invalid cart name')
  }

  class Cart extends React.PureComponent {
    static propTypes = {
      onInitCart: PropTypes.func.isRequired,
      onAddToCart: PropTypes.func.isRequired,
    }

    componentWillMount() {
      this.props.onInitCart(type)
    }

    onAddItem = (item, quantity = 1, options = []) => {
      for (let i = 0; i < quantity; i += 1) {
        this.props.onAddToCart(item, quantity, options)
      }
    }

    render() {
      const {
        onInitCart, // eslint-disable-line
        ...props
      } = this.props

      const customProps = {
        ...props,
        onAddToCart: this.onAddItem,
      }

      return <WrappedComponent {...customProps} />
    }
  }

  const mapStateToProps = createStructuredSelector({
    cart: getCart(type),
    getCartFromIndex: (index) => getCartFromIndex(type, index),
    getCartItemFromParamValue: (param, value) => getCartItemFromParamValue(type, param, value),
  })

  const mapDispatchToProps = (dispatch) => ({
    onInitCart: () => dispatch(cartInit(type)),
    onAddToCart: (item, quantity, options) => dispatch(cartAddItem(type, item, quantity, options)),
    onRemoveToCart: (index) => dispatch(cartRemoveItem(type, index)),
    onUpdateToCart: (item, quantity, options) => dispatch(cartUpdateItem(type, item, quantity, options)),
    onEmptyCart: () => dispatch(cartEmpty(type)),
  })

  const withConnect = connect(mapStateToProps, mapDispatchToProps)

  const withReducer = injectReducer({ key: CART_STORE_NAME, reducer })

  return compose(
    withReducer,
    withConnect,
  )(Cart)
}
