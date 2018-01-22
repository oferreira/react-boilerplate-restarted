/**
*
* Small Expand Component
* Toggle a block
*/

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import classNames from 'classnames'
/*
 * Custom imports
 */
import ClickOutside from 'react-click-outside'

import { close } from '../actions'
import { EXPAND_DROPDOWN } from '../constants'
import { makeIsOpen } from '../selectors'
require('../styles.scss')

const DropDown = ({
  isOpen,
  children,
  className,
  onClose,
  hookOnClose, // eslint-disable-line
  dispatch, // eslint-disable-line
  ...props
}) => {
  const classes = classNames('Expand__DropDown', {
    'Expand__DropDown--isOpen': isOpen,
    [className]: className,
  })

  return (
    <ClickOutside onClickOutside={() => isOpen ? setTimeout(onClose, 0) : {}} className={classes} {...props}>
      {children}
    </ClickOutside>
  )
}

DropDown.propTypes = {
  children: PropTypes.node,
  /**
   * Namespace used for state and selectors
   * Allow to genericly attached the component to the state
   */
  name: PropTypes.string.isRequired, // eslint-disable-line
  isOpen: PropTypes.bool,
  className: PropTypes.string,
  onClose: PropTypes.func.isRequired,
}

DropDown.defaultProps = {
  isOpen: false,
}

const mapStateToProps = (state, ownProps) => (createStructuredSelector({
  isOpen: makeIsOpen(state, ownProps.name || EXPAND_DROPDOWN),
}))

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClose: () => {
    if (ownProps.hookOnClose) ownProps.hookOnClose()
    dispatch(close(ownProps.name || EXPAND_DROPDOWN))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(DropDown)
