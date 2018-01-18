import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

// import Node from 'drupal/containers/Node'
import Footer from 'common/containers/Footer'

import BurgerMenu from 'common/components/BurgerMenu'
import BurgerToggle from 'common/components/BurgerMenu/BurgerToggle'
import Header from 'common/components/Header'
import SelectLanguages from 'core/language/containers/SelectLanguages'
import Translation from 'core/language/components/Translation'
import Partnerships from 'brand/containers/Partnerships'
import './style.scss'


export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="HomePage">
        <Header>
          <BurgerToggle />
        </Header>
        <BurgerMenu />
        <Partnerships />
        {/* <Node id={22} /> */}
        <SelectLanguages />
        <Translation id="app.CityTax.taxesAndChargeIncluded" />
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
