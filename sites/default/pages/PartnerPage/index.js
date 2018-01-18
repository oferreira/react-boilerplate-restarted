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

// OffersPage.propTypes = {}
// OffersPage.defaultProps = {}
//
// const mapStateToProps = null
// const mapDispatchToProps = null
//
// export default connect(mapStateToProps, mapDispatchToProps)(OffersPage)

export default PartnerPage
