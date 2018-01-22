/**
*
* Small Expand Component
* Toggle a block
*/

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import ClickOutside from 'react-click-outside'
import classNames from 'classnames'

import FullPage from 'components/Expand/FullPage'
import { Desktop, Mobile } from 'utils/breakpoint'
import { close } from '../actions'

/*
* Custom imports
*/
import { EXPAND_SIDEPANEL } from '../constants'
import { makeIsOpen } from '../selectors'
require('../styles.scss')

const SidePanel = ({
  isOpen,
  onClose,
  children,
  title,
  // prevent dispatch to be passed as a props
  dispatch, // eslint-disable-line
  ...props
}) => {
  const classes = classNames('Expand__SidePanel', {
    'Expand__SidePanel--isOpen': isOpen,
    'Expand__SidePanel--isClosed': !isOpen,
  })
  return (
    <div>
      <Desktop>
        <ClickOutside onClickOutside={() => isOpen ? onClose() : {}} className={classes} {...props}>
          {children}
        </ClickOutside>
      </Desktop>
      <Mobile>
        <FullPage title={title} {...props}>
          {children}
        </FullPage>
      </Mobile>
    </div>
  )
}

SidePanel.propTypes = {
  children: PropTypes.node,
  /**
   * Namespace used for state and selectors
   * Allow to genericly attached the component to the state
   */
  name: PropTypes.string.isRequired, // eslint-disable-line
  /**
   * If specified, display a header bar in the mobile fullpage component
   */
  title: PropTypes.any,
  /**
   * Handler used to display the panel
   * @type boolean
   */
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

SidePanel.defaultProps = {}

const mapStateToProps = (state, ownProps) => (createStructuredSelector({
  isOpen: makeIsOpen(state, ownProps.name || EXPAND_SIDEPANEL),
}))

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClose: () => {
    if (ownProps.hookOnClose) ownProps.hookOnClose()
    dispatch(close(ownProps.name || EXPAND_SIDEPANEL))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(SidePanel)
