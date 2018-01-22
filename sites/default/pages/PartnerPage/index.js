import React from 'react'
import Header from 'common/components/Header'
import Partner from 'layouts/Partner'
import './style.scss'

export class PartnerPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="PartnerPage">
        <Header />
        <div className="container">
          <Partner />
        </div>
      </div>
    )
  }
}

export default PartnerPage
