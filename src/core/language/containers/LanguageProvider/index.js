/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `/translations`)
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { IntlProvider } from 'react-intl'
import {
  makeSelectLocale,
  makeSelectMessages,
} from 'core/language/selectors'
import { requestLanguages } from 'core/language/actions'

export class LanguageProvider extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.onRequestLanguages()
  }

  render() {
    return (
      <IntlProvider
        locale={this.props.locale}
        messages={this.props.messages.toJS()}
      >
        {React.Children.only(this.props.children)}
      </IntlProvider>
    )
  }
}

LanguageProvider.propTypes = {
  locale: PropTypes.string,
  messages: PropTypes.object,
  onRequestLanguages: PropTypes.func,
  children: PropTypes.element.isRequired,
}

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  messages: makeSelectMessages(),
})

const mapDispatchToProps = (dispatch) => ({
  onRequestLanguages: () => dispatch(requestLanguages()),
})

export default connect(mapStateToProps, mapDispatchToProps)(LanguageProvider)
