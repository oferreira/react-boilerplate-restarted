import { injectIntl } from 'react-intl'

const FormatMessage = ({ id, intl }) => (
  intl.formatMessage(id)
)

FormatMessage.propTypes = {

}

export default injectIntl(FormatMessage)
