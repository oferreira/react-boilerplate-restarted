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
import { open } from '../actions'
import { EXPAND_SMALL } from '../constants'
import { makeIsOpen } from '../selectors'
require('../styles.scss')

class Small extends React.Component {
  componentWillMount() {
    if (this.props.startOpened) {
      this.props.open()
    }
  }
  render() {
    const {
      isOpen,
      children,
    } = this.props

    const classes = classNames('Expand__Small', {
      'Expand__Small--isOpen': isOpen,
    })
    return (
      <div className={classes}>
        <div className="Expand__Small__Content">
          {children}
        </div>
      </div>
    )
  }
}

Small.propTypes = {
  children: PropTypes.node,
  /**
   * Namespace used for state and selectors
   * Allow to genericly attached the component to the state
   */
  name: PropTypes.string.isRequired, // eslint-disable-line
  isOpen: PropTypes.bool,
  startOpened: PropTypes.bool,
  open: PropTypes.func,
}

Small.defaultProps = {
  isOpen: false,
}

const mapStateToProps = (state, ownProps) => (createStructuredSelector({
  isOpen: makeIsOpen(state, ownProps.name || EXPAND_SMALL),
}))

const mapDispatchToProps = (dispatch, ownProps) => ({
  open: () => dispatch(open(ownProps.name || EXPAND_SMALL)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Small)
