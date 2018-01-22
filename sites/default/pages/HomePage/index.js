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

import Icon from 'common/components/Icon'
import Button from 'common/components/Button'
import './style.scss'


export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="HomePage">
        <Header>
          <BurgerToggle />
        </Header>

        <div>

          <Translation id="app.CityTax.taxesAndChargeIncluded" />
          <Node id={22} />
          <SelectLanguages />


          <h1 className="heading-primary-1">heading-primary-1</h1>
          <h1 className="heading-primary-2">heading-primary-2</h1>
          <h1 className="heading-primary-3">heading-primary-3</h1>


          <h1 className="heading-secondary-1">heading-secondary-1</h1>
          <h1 className="heading-secondary-2">heading-secondary-2</h1>
          <h1 className="heading-secondary-3">heading-secondary-3</h1>


          <p className="body-1">body-1</p>
          <p className="body-2">body-2</p>
          <p className="body-3">body-3</p>

          <a href="http://www.google.com" className="link">Link </a>

        </div>


        <BurgerMenu />
        <div className="WrapperPage">

          <div className="blockCms blockBrands">

            <div className="blockBrands__wrapper">

              <h1 className="blockBrands__title">Our brands</h1>

              <a href="http://www.google.com" title="Brand - Royal Tulip " className="blockBrands__brand">
                <img className="blockBrands__img" src="../../assets/brands/royal-tulip.jpg" alt="Logo - Royal Tulip - luxury hotel" />
                <p className="blockBrands__txt">Midscale properties</p>
                <Button rounded small>
                  Learn more
                </Button>
              </a>

              <a href="http://www.google.com" title="Brand - Golden tulip" className="blockBrands__brand">
                <img className="blockBrands__img" src="../../assets/brands/golden-tulip.jpg" alt="Logo - Golden tulip" />
                <p className="blockBrands__txt">Midscale properties</p>
                <Button rounded small>
                  Learn more
                </Button>
              </a>

              <a href="http://www.google.com" title="Brand -Tulip Inn" className="blockBrands__brand">
                <img className="blockBrands__img" src="../../assets/brands/tulip-inn.jpg" alt="Logo - Tulip Inn" />
                <p className="blockBrands__txt">Midscale properties</p>
                <Button rounded small>
                  Learn more
                </Button>
              </a>

              <a href="http://www.google.com" title="View all Louvre hotel Group brands" className="blockBrands__Link">
                <span>View all Louvre hotel Group brands</span>
                <Icon name="arrow-bot" />
              </a>

              <h2 className="blockBrands__subTitle">Our hotel partner</h2>

              <a href="http://www.google.com" title="Brand - Magnuson " className="blockBrands__brand">
                <img className="blockBrands__img" src="../../assets/brands/magnuson.jpg" alt="Logo - Magnuson worldwide" />
                <p className="blockBrands__txt">Americ’as fastest growing hotel brand</p>
                <Button rounded small>
                  Learn more
                </Button>
              </a>

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
