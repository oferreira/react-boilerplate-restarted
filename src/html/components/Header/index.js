/*
  JUST FOR TEST AND EXAMPLE
*/
import React from 'react'
import PropTypes from 'prop-types'
import { isBurgerOpen } from 'html/selectors/burgerMenu'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import classNames from 'classnames'
import './styles.scss'

const Header = ({
  burgerIsOpen,
  children,
  secondary,
  tertiary,
}) => {
  const classes = classNames(
    'Header',
    {
      'Header--burgerIsOpen': burgerIsOpen,
      Header__Secondary: secondary,
      Header__Tertiary: tertiary,
    }
  )


  return (
    <div className={classes}>
      <div className="Header__Content">
        {children}
      </div>
    </div>
  )
}

Header.propTypes = {
  burgerIsOpen: PropTypes.bool,
  secondary: PropTypes.bool,
  tertiary: PropTypes.bool,
  children: PropTypes.node,
}

Header.defaultProps = {
  secondary: false,
  tertiary: false,
  burgerIsOpen: false,
}

const mapStateToProps = createStructuredSelector({
  burgerIsOpen: isBurgerOpen() || false,
})


export default connect(mapStateToProps, null)(Header)
