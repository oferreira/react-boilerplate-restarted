import { injectIntl } from 'react-intl'

const formatMessage = ({ id, intl }) => (
  intl.formatMessage(id)
)

formatMessage.propTypes = {

}

export default injectIntl(formatMessage)
