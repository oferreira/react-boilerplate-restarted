import React from 'react'
import { connect } from 'react-redux'

import Footer from 'common/containers/Footer'
import BurgerMenu from 'common/components/BurgerMenu'
import BurgerToggle from 'common/components/BurgerMenu/BurgerToggle'
import Header from 'common/components/Header'

import Node from 'drupal/containers/Node'

import './style.scss'


export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="HomePage">
        <Header>
          <BurgerToggle />
        </Header>
        <BurgerMenu />
        <div className="container">
          <Node id={22} />
        </div>
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

export default withConnect(HomePage)
