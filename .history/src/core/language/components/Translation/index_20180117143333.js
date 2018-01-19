import React from 'react'
import PropTypes from 'prop-types'
import {
  injectIntl,
  FormattedMessage,
  FormattedHTMLMessage,
} from 'react-intl'

class Translation extends FormattedMessage {
  componentDidMount() {
    this.toto = this.toto.bind(this)
  }

  static toto = (id) => {
    console.log(id)
    return this.props.intl.messages[id]
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
