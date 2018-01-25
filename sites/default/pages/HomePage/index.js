import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import Node from 'drupal/containers/Node'
import Footer from 'common/containers/Footer'

import BurgerToggle from 'common/components/BurgerMenu/BurgerToggle'
import Header from 'common/components/Header'
import SelectLanguages from 'core/language/containers/SelectLanguages'
import Translation from 'core/language/components/Translation'

import './style.scss'


export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="HomePage">
        <Header>
          <BurgerToggle />
        </Header>

        <div className="WrapperPage">

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
