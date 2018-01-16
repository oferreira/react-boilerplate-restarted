import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import Node from 'drupal/containers/Node'
import Menu from 'drupal/containers/Menu'
import Footer from 'html/containers/Footer'
import './style.scss'


export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="HomePage">
        <Menu id="main" />
        <Node id={22} />
        <Footer menuId="footer" />
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
