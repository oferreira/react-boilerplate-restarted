import React from 'react'
import PropTypes from 'prop-types'
import {
  injectIntl,
  FormattedMessage,
  FormattedHTMLMessage,
} from 'react-intl'

class Translation extends FormattedMessage {
  static get toto() {
    console.log('ici')
  }

  render() {
    if (this.props.intl.messages[this.props.id]) {
      const Message = (this.props.html ? FormattedHTMLMessage : FormattedMessage)
      return <Message {...this.props} />
    }
    return <span>{this.props.id}</span>
  }
}

Translation.propTypes = {
  ...FormattedMessage.propTypes,
  html: PropTypes.bool,
}

Translation.defaultProps = {
  ...FormattedMessage.defaultProps,
  html: false,
}

export default injectIntl(Translation)
