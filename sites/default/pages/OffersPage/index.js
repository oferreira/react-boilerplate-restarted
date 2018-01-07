import React from 'react'
// import { connect } from 'react-redux'
import Button from 'html/components/Button'

export class OffersPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <h1>OffersPage</h1>
        <Button>Test include a component from core</Button>
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
