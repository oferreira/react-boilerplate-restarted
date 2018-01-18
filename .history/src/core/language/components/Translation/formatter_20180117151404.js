import { injectIntl } from 'react-intl'

let formatMessage = (intl) = (id) => {
  console.log(id)
}

formatMessage = injectIntl(formatMessage)

export {
  formatMessage,
}
