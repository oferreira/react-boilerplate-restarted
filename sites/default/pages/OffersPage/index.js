import React from 'react'
// import { connect } from 'react-redux'
import HtmlButton from 'html/components/HtmlButton'

export class OffersPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        OffersPage
        <HtmlButton>
          dispatch
        </HtmlButton>
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
