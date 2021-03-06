import React from 'react'
import PropTypes from 'prop-types'
import Header from 'common/components/Header'
import BurgerMenu from 'common/components/BurgerMenu'
import Footer from 'common/containers/Footer'
import './styles.scss'

const CommonWrapper = ({ children }) => (
  <div className="CommonWrapper">
    <Header />
    <BurgerMenu />
    <div className="CommonWrapper__Container">
      {children}
    </div>
    <Footer menuId="footer" />
  </div>
)

CommonWrapper.propTypes = {
  children: PropTypes.node,
}

export default CommonWrapper
