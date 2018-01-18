import React from 'react'
import PropTypes from 'prop-types'
import {
  injectIntl,
  FormattedMessage,
  FormattedHTMLMessage,
} from 'react-intl'

class Translation extends FormattedMessage {
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

Translation.toto = (id, intl) => {
  console.log(id)
  console.log(intl)
}

export default injectIntl(Translation)
