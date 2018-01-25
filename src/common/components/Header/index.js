/*
  JUST FOR TEST AND EXAMPLE
*/
import React from 'react'
import PropTypes from 'prop-types'
import { isBurgerOpen } from 'common/selectors/burgerMenu'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import classNames from 'classnames'
import BurgerToggle from 'common/components/BurgerMenu/BurgerToggle'
import './styles.scss'

const Header = ({
  burgerIsOpen,
  children,
  secondary,
  tertiary,
  noFlex,
}) => {
  const classes = classNames(
    'Header',
    {
      'Header--burgerIsOpen': burgerIsOpen,
      Header__Secondary: secondary,
      Header__Tertiary: tertiary,
    }
  )

  const contentClasses = classNames(
    'Header__Content',
    {
      'Header__Content--NoFlex': noFlex,
    }
  )

  return (
    <div className={classes}>
      <div className={contentClasses}>
        <BurgerToggle />
        {children}
      </div>
    </div>
  )
}

Header.propTypes = {
  burgerIsOpen: PropTypes.bool,
  secondary: PropTypes.bool,
  tertiary: PropTypes.bool,
  noFlex: PropTypes.bool,
  children: PropTypes.node,
}

Header.defaultProps = {
  secondary: false,
  tertiary: false,
  burgerIsOpen: false,
  noFlex: false,
}

const mapStateToProps = createStructuredSelector({
  burgerIsOpen: isBurgerOpen() || false,
})


export default connect(mapStateToProps, null)(Header)
