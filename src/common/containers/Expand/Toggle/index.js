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
import { open, close, closeAll } from 'components/Expand/actions'
import { makeIsOpen } from '../selectors'
require('../styles.scss')

const Toggle = ({
  onOpen,
  onClose,
  isOpen,
  opened,
  closed,
  style,
  className,
  children,
}) => (// eslint-disable-next-line
  <div
    className={
      classNames('Expand__Toggle', {
        [className]: className,
      })}
    style={style}
    onClick={() => (!isOpen ? onOpen() : onClose())}
  >
    {children}
    {isOpen && opened ? opened : (closed || opened)}
  </div>
)

Toggle.propTypes = {
  /**
   * Children displayed when the component is opened
   */
  opened: PropTypes.node,
  /**
   * Children displayed when the component is closed
   */
  closed: PropTypes.node,
  /**
   * Namespace used for state and selectors
   * Allow to genericly attached the component to the state
   */
  name: PropTypes.string.isRequired, // eslint-disable-line
  isOpen: PropTypes.bool.isRequired,
  onOpen: PropTypes.func,
  hookOnOpen: PropTypes.func, // eslint-disable-line
  onClose: PropTypes.func,
  hookOnClose: PropTypes.func, // eslint-disable-line
  style: PropTypes.object,
  children: PropTypes.node,
  className: PropTypes.string,
  // eslint-disable-next-line
  closeAll: PropTypes.any,
}

Toggle.defaultProps = {}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onOpen: () => {
    if (typeof ownProps.hookOnOpen === 'function') ownProps.hookOnOpen(ownProps.name)
    if (ownProps.closeAll) dispatch(closeAll())
    dispatch(open(ownProps.name))
  },
  onClose: () => {
    if (typeof ownProps.hookOnClose === 'function') ownProps.hookOnClose(ownProps.name)
    dispatch(ownProps.closeAll ? closeAll() : close(ownProps.name))
  },
  closeAll: () => dispatch(closeAll()),
})

const mapStateToProps = (state, ownProps) => (createStructuredSelector({
  isOpen: makeIsOpen(state, ownProps.name),
}))

export default connect(mapStateToProps, mapDispatchToProps)(Toggle)
