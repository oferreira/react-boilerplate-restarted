import React from 'react'
import Footer from 'common/containers/Footer'


import BurgerToggle from 'common/components/BurgerMenu/BurgerToggle'
import Header from 'common/components/Header'
import BrandLayout from 'layouts/BrandLayout'
import './style.scss'

export class PartnerPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (

      <div className="BrandPage">

        <Header>
          <BurgerToggle />
        </Header>

        <div className="WrapperPage">
          <BrandLayout />
        </div>

        <Footer menuId="footer" />

      </div>
    )
  }
}

export default PartnerPage
