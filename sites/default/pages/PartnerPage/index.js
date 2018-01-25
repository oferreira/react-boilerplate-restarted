import React from 'react'
import Partner from 'layouts/Partner'
import CommonWrapper from 'common/components/CommonWrapper'
import './style.scss'

export class PartnerPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <CommonWrapper>
        <Partner />
      </CommonWrapper>
    )
  }
}

export default PartnerPage
