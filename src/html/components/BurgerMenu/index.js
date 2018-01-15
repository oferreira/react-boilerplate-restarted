import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { isBurgerOpen } from 'html/selectors/burgerMenu'
import MenuList from './MenuList'
import './styles.scss'

const BurgerMenu = ({ isOpen }) => {
  const classes = classNames(
    'BurgerMenu',
    { 'BurgerMenu--isOpen': isOpen }
  )

  return (
    <div className={classes}>
      <div className="BurgerMenu__Content">
        <div className="BurgerMenu__List">
          <MenuList id="main" />
        </div>
        <div className="BurgerMenu__StayConfigurator">
          <div className="stayConfPlaceHolder">
            Waiting for StayConfigurator
          </div>
        </div>
        <ul className="BurgerMenu__Footer">
          <li>Contact</li>
          <li>FAQ</li>
          <li>News</li>
          <li>Partners</li>
        </ul>
      </div>
    </div>
  )
}

BurgerMenu.propTypes = {
  isOpen: PropTypes.bool,
}

BurgerMenu.defaultProps = {
  isOpen: false,
}

const mapStateToProps = createStructuredSelector({
  isOpen: isBurgerOpen(),
})


export default connect(mapStateToProps, null)(BurgerMenu)
