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
import IconButton from 'components/Icon/Button'
/*
 * Custom imports
 */
import { closeAll as closeExpand } from '../actions'
import { EXPAND_MEDIUM } from '../constants'
import { makeIsOpen } from '../selectors'
require('../styles.scss')

const Medium = ({
  isOpen,
  children,
  closeAll,
  ...props
}) => {
  const classes = classNames('Expand__Medium', {
    'Expand__Medium--isOpen': isOpen,
    'Expand__Medium--isClosed': !isOpen,
  })
  const wclasses = classNames('Wrapper__Expand', {
    'Wrapper__Expand--isOpen': isOpen,
  })

  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }

  return (
    <div className={wclasses} {...props}>
      <div className={classes}>
        <IconButton onClick={closeAll} name="cross" />
        {children}
      </div>
      <button onClick={closeAll} className="Medium__Close" />
    </div>
  )
}

Medium.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  closeAll: PropTypes.func.isRequired,
}

Medium.defaultProps = {
  isOpen: false,
}

const mapDispatchToProps = (dispatch) => ({
  closeAll: () => dispatch(closeExpand()),
})

const mapStateToProps = (state, ownProps) => (createStructuredSelector({
  isOpen: makeIsOpen(state, ownProps.name || EXPAND_MEDIUM),
}))

export default connect(mapStateToProps, mapDispatchToProps)(Medium)
