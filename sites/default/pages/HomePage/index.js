import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import Node from 'drupal/containers/Node'
import Footer from 'common/containers/Footer'

import BurgerMenu from 'common/components/BurgerMenu'
import BurgerToggle from 'common/components/BurgerMenu/BurgerToggle'
import Header from 'common/components/Header'
import SelectLanguages from 'core/language/containers/SelectLanguages'
import Translation from 'core/language/components/Translation'
import Faq from 'drupal/containers/Faq'

import H1 from 'common/components/H1'
import Button from 'common/components/Button'
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
          <SelectLanguages />
          <Translation id="app.CityTax.taxesAndChargeIncluded" />
          <Faq />

          <div className="blockCms blockOurBrands">
            <H1 playful>Our brands</H1>
            <h1 className="blockOurBrands__title">Our brands</h1>

            <div className="blockOurBrands__brand">
              <img className="blockOurBrands__img" src="../../assets/brands/royal-tulip.jpg" alt="Logo Royal Tulip - luxury hotel" />
              <p className="blockOurBrands__txt">Midscale properties</p>

              <Button rounded small>
                Learn more
              </Button>

            </div>


          </div>

        </div>
        <Footer menuId="footer" />
      </div>)
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
