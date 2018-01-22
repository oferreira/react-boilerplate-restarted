import React from 'react'
import Header from 'common/components/Header'
import Miles from 'layouts/Miles'
import './style.scss'

export class MilesPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="PartnerPage">
        <Header />
        <div className="container">
          <Miles />
        </div>
      </div>
    )
  }
}

export default MilesPage
