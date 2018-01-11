import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { createStructuredSelector } from 'reselect'
import classNames from 'classnames'

// Selectors
import { makeSelectLocale } from 'core/language/selectors'

// Utils
import injectReducer from 'core/reducers/utils/injectReducer'
import injectSaga from 'core/sagas/utils/injectSaga'
import { Session } from 'core/utils/session'

// Local import
import reducer from './reducers'
import saga from './sagas'
import { requestCookiePolicy } from './actions'
import { makeSelectCookiePolicy } from './selectors'
import { COOKIE_STORE_NAME } from './constants'

import './styles.scss'

export class CookiePolicy extends React.PureComponent {
  static propTypes = {
    onInit: PropTypes.func.isRequired,
    renderViewMore: PropTypes.func,
    cookiePolicy: PropTypes.object,
    className: PropTypes.string,
    locale: PropTypes.string,
    acceptButton: PropTypes.node,
    viewMoreButton: PropTypes.node,
  }

  state = {
    status: Session.get(COOKIE_STORE_NAME, true) || false,
    isDisplayed: false,
  }

  componentWillMount() {
    const {
      onInit,
      locale,
    } = this.props

    if (!this.state.status) {
      onInit(locale)
    }
  }

  handleClick = () => {
    const status = true
    Session.set(COOKIE_STORE_NAME, status, 60 * 60 * 24, true)
    this.setState({ status })
  }

  handleViewMore = () => {
    this.setState((prevState) => ({ isDisplayed: !prevState.isDisplayed }))
  }

  render() {
    const {
      cookiePolicy,
      acceptButton,
      viewMoreButton,
      renderViewMore,
      className,
    } = this.props

    if (this.state.status) return null
    const classes = classNames('CookiePolicyBanner', {
      [className]: className,
    })

    return (
      <div>
        <div className={classes}>
          <div className="CookiePolicyBanner__Container">
            <p>{cookiePolicy.label}</p>
            <div className="CookiePolicyBanner__Buttons">
              {React.cloneElement(acceptButton || <div>Accept</div>, { onClick: this.handleClick })}
              {React.cloneElement(viewMoreButton || <div>View More</div>, { onClick: this.handleViewMore })}
            </div>
          </div>
        </div>
        {this.state.isDisplayed && (
          renderViewMore
            ? renderViewMore(cookiePolicy.body)
            : <div dangerouslySetInnerHTML={{ __html: cookiePolicy.body }}></div>
        )}
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  cookiePolicy: makeSelectCookiePolicy,
})

const mapDispatchToProps = (dispatch) => ({
  onInit: (locale) => dispatch(requestCookiePolicy(locale)),
  navigate: (url) => dispatch(push(url)),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
const withReducer = injectReducer({ key: COOKIE_STORE_NAME, reducer })
const withSaga = injectSaga({ key: COOKIE_STORE_NAME, saga })

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(CookiePolicy)
