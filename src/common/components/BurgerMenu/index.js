import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { isBurgerOpen } from 'common/selectors/burgerMenu'
import Menu from 'common/components/Menu'
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
          <Menu id="main" column />
        </div>
        <div className="BurgerMenu__StayConfigurator">
          <div className="stayConfPlaceHolder">
            Waiting for StayConfigurator
          </div>
        </div>
        <div className="BurgerMenu__Footer">
          <Menu id="footerburger" row />
        </div>
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
