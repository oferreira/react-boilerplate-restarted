import React from 'react'
import PropTypes from 'prop-types'
import * as RHelmet from 'react-helmet'
import { injectIntl, intlShape } from 'react-intl'

import messages from './messages'

function Helmet({
  titleKey,
  subTitle,
  intl,
}) {
  const title = `${messages[titleKey] ? intl.formatMessage(messages[titleKey]) : titleKey} ${subTitle ? `- ${subTitle}` : ''}`

  return (
    <div className="Helmet">
      <RHelmet
        title={title}
        meta={[
          { name: 'description', content: titleKey },
        ]}
      />
    </div>
  )
}

Helmet.propTypes = {
  titleKey: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  intl: intlShape,
}

Helmet.defaultProps = {
  subTitle: 'Louvre Hotels Group',
}

export default injectIntl(Helmet)
