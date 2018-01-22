/**
*
* FullPage Component
* Open an animated full size (on mobile) modal with a Header
* and a close button
*/

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import classNames from 'classnames'
/*
 * Custom imports
 */
import Header from 'components/Header'
import IconButton from 'components/Icon/Button'
import { EXPAND_FULL_PAGE } from '../constants'
import { close, open } from '../actions'
import { makeIsOpen } from '../selectors'
require('../styles.scss')

/**
 * Display a fullpage modal on mobile
 */
class FullPage extends React.Component {
  componentWillMount() {
    if (this.props.startOpened) {
      this.props.open()
    }
  }
  render() {
    const {
      title,
      isOpen,
      children,
      onClose,
      bgColor,
      unclosable,
    } = this.props
    const classes = classNames('Expand__FullPage', {
      'Expand__FullPage--isClosed': !isOpen,
      'Expand__FullPage--isOpen': isOpen,
    })
    const wclasses = classNames('Wrapper__Expand', {
      'Wrapper__Expand--isOpen': isOpen,
    })
    return (
      <div className={wclasses}>
        <div className={classes} style={{ backgroundColor: bgColor }}>
          <Header>
            <h2 className="FullPage__Title">{title}</h2>
            {!unclosable && <IconButton onClick={onClose} name="cross" style={{ marginLeft: '-48px' }} tertiary />}
          </Header>
          {children}
        </div>
      </div>
    )
  }
}

FullPage.propTypes = {
  children: PropTypes.node,
  /**
   * Allow to genericly attached the component to the state
   */
  name: PropTypes.oneOfType([ // eslint-disable-line
    PropTypes.string.isRequired,
    PropTypes.node.isRequired,
  ]),
  startOpened: PropTypes.bool,
  open: PropTypes.func,
  /**
   * Handler used to close the panel
   * @dispatch action EXPAND_FULL_PAGE_CLOSE
   */
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  /**
   * Title displayed in the Header of the Expand modal
   */
  title: PropTypes.oneOfType([ // eslint-disable-line
    PropTypes.string.isRequired,
    PropTypes.node.isRequired,
  ]),
  bgColor: PropTypes.string,
  unclosable: PropTypes.bool,
}

FullPage.defaultProps = {
  isOpen: false,
  unclosable: false,
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClose: () => {
    if (ownProps.onCloseExpand) {
      ownProps.onCloseExpand()
    }
    dispatch(close(ownProps.name))
  },
  open: () => dispatch(open(ownProps.name || EXPAND_FULL_PAGE)),
})

const mapStateToProps = (state, ownProps) => (createStructuredSelector({
  isOpen: makeIsOpen(state, ownProps.name || EXPAND_FULL_PAGE),
}))

export default connect(mapStateToProps, mapDispatchToProps)(FullPage)
