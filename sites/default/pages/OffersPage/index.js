import React from 'react'
// import { connect } from 'react-redux'
import Button from 'html/components/Button'
import H1 from 'html/components/H1'
import './style.scss'

export class OffersPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="gt-offer-conainter">

        <div className="gt-offer-header">
          <H1 className="gt-offer-header__title">
            OffersPage
          </H1>
          <div className="gt-offer-header__desc">
            <Button>
              Test include a component from core
            </Button>
          </div>

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

export default OffersPage
