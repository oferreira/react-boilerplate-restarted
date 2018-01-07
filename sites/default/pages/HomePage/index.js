import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Link } from 'react-router-dom'
import HtmlButton from 'html/components/HtmlButton'


export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <h1>
            HomePage
          <Link to="/offers">About</Link>
        </h1>

        <HtmlButton>
                BTN
        </HtmlButton>
      </div>
    )
  }
}

HomePage.propTypes = {}
HomePage.defaultProps = {}

const mapStateToProps = null
const mapDispatchToProps = null


const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect,
)(HomePage)
