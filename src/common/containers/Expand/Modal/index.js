/**
*
* Modal Expand Component
* Toggle a block
*/
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import ReactModal from 'react-modal'

/*
 * Custom imports
 */
import { Desktop, Mobile } from 'utils/breakpoint'
import IconButton from 'components/Icon/Button'
import FullPage from 'components/Expand/FullPage'
import { open, close } from '../actions'
import { EXPAND_MODAL } from '../constants'
import { makeIsOpen } from '../selectors'
require('../styles.scss')


class Modal extends React.PureComponent {
  componentWillMount() {
    if (this.props.startOpened) {
      this.props.open()
    }
  }

  renderModal() {
    const {
      isOpen,
      style,
      closeExpand,
      title,
      children,
      // minified,
      unclosable,
    } = this.props

    const overlayStyle = {
      position: 'fixed',
      zIndex: '300',
      left: '0',
      top: '0',
      height: '100%',
      width: '100%',
      background: 'rgba(0, 0, 0, 0.5)',
      pointerEvents: 'all',
    }

    const customStyles = {
      content: {
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        zIndex: '101', // Superior to others
        padding: '0',
        flex: '0 0 auto',
        borderRadius: '0',
        border: '0',
        overflow: 'none',
        margin: '0 auto',
        background: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '320px',
      },
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        background: 'transparent',
      },
    }

    return (
      <ReactModal
        style={customStyles}
        isOpen={isOpen}
        contentLabel=""
        shouldFocusAfterRender={false}
      >
        {
          // Overlay custom to handle full page and close expand clicking away
          <div style={overlayStyle} onClick={!unclosable ? closeExpand : null} /> // eslint-disable-line
        }
        <div className="Modal" style={{ flex: '0 0 auto', minWidth: '320px', ...style }}>
          {title && (
            <div className="Modal__Header">
              {!unclosable && <IconButton onClick={closeExpand} className="Modal__HeaderBtnClose" name="cross" />}
              <h2 className="Modal__HeaderTitle">{title}</h2>
            </div>
          )}

          <div className="Modal__Wrapper">
            {children}
          </div>
        </div>
      </ReactModal>
    )
  }

  render() {
    const {
      name,
      children,
      title,
      bgColor,
      closeExpand,
      forceModalOnMobile,
      unclosable,
    } = this.props


    return (
      <div>
        <Desktop>
          {this.renderModal()}
        </Desktop>

        {!forceModalOnMobile && <Mobile>
          <FullPage name={name} title={title} bgColor={bgColor} onCloseExpand={closeExpand} unclosable={unclosable}>
            {children}
          </FullPage>
        </Mobile>}
        {forceModalOnMobile && this.renderModal()}
      </div>
    )
  }
}

Modal.propTypes = {
  children: PropTypes.node,
  /**
   * Namespace used for state and selectors
   * Allow to genericly attached the component to the state
   */
  name: PropTypes.string.isRequired, // eslint-disable-line
  isOpen: PropTypes.bool,
  startOpened: PropTypes.bool,
  open: PropTypes.func,
  closeExpand: PropTypes.func,
  // onClose: PropTypes.func,
  style: PropTypes.object,
  title: PropTypes.any,
  bgColor: PropTypes.string,
  // minified: PropTypes.bool,
  forceModalOnMobile: PropTypes.bool,
  unclosable: PropTypes.bool,
}

Modal.defaultProps = {
  isOpen: false,
  title: null,
  forceModalOnMobile: false,
  unclosable: false,
  style: {
    flex: '0 0 auto',
  },
}

const mapStateToProps = (state, ownProps) => (createStructuredSelector({
  isOpen: makeIsOpen(state, ownProps.name || EXPAND_MODAL),
}))

const mapDispatchToProps = (dispatch, ownProps) => ({
  open: () => dispatch(open(ownProps.name || EXPAND_MODAL)),
  closeExpand: () => {
    if (ownProps.onClose) {
      ownProps.onClose()
    }
    dispatch(close(ownProps.name || EXPAND_MODAL))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
