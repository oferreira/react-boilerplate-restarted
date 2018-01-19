import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, FormattedMessage, intlShape } from 'react-intl'

class Message extends FormattedMessage {
  static propTypes = {
    id: PropTypes.string,
    values: PropTypes.object,
    fallbackMessage: PropTypes.string,
    className: PropTypes.string,
    intl: intlShape,
  }

  static defaultProps = {
    values: {},
    fallbackMessage: '',
  }

  render() {
    const {
      intl,
      id,
      values,
      fallbackMessage,
      ...otherProps
    } = this.props

    return (
      intl.messages[id]
        ? <FormattedMessage {...{ id, ...otherProps }} values={values} />
        : <span>{fallbackMessage}</span>
    )
  }
}

export default injectIntl(Message)
