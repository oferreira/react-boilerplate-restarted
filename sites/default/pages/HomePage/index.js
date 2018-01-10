import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Link } from 'react-router-dom'
import Node from 'drupal/containers/Node'
import Menu from 'drupal/containers/Menu'
import './style.scss'


export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <h1>HomePage</h1>
        <Menu id="main" />
        <Link to="/offers">
          Go to OffersPage
        </Link>
        <Node id={22} />
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
