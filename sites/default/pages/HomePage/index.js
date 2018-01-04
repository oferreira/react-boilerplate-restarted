import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Link } from 'react-router-dom'
// require('./styles.scss')


export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <h1>
        HomePage
        <Link to={'/offers'}>About</Link>
      </h1>
    )
  }
}

HomePage.propTypes = {}
HomePage.defaultProps = {}

const mapStateToProps = null
const mapDispatchToProps = null


const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(HomePage)
