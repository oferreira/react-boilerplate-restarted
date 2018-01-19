import { injectIntl } from 'react-intl'

let formatMessage = (id) = () => {
  console.log(id)
}

formatMessage = injectIntl(formatMessage)

export {
  formatMessage,
}
