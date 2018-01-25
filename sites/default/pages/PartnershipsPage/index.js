import React from 'react'
import Partnerships from 'layouts/Partnerships'
import CommonWrapper from 'common/components/CommonWrapper'
import './style.scss'

export class PartnershipsPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <CommonWrapper>
        <Partnerships />
      </CommonWrapper>
    )
  }
}

export default PartnershipsPage
