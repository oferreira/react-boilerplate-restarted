/*
  JUST FOR TEST AND EXAMPLE
*/
import React from 'react'
import PropTypes from 'prop-types'
import { isBurgerOpen } from 'html/selectors/burgerMenu'
import { burgerToggle } from 'html/actions/burgerMenu'
import Icon from 'html/components/Icon'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import classNames from 'classnames'
import './styles.scss'

const Header = ({
  burgerIsOpen,
  children,
  secondary,
  tertiary,
  toggleBurger
}) => {
  const classes = classNames(
    'Header',
    {
      'Header--burgerIsOpen': burgerIsOpen,
      Header__Secondary: secondary,
      Header__Tertiary: tertiary,
    }
  )
  const burger = () => (
    toggleBurger(!burgerIsOpen)
  )

  return (
    <div className={classes}>
      <div className="Header__Content">
        <div
          className={`Header__BurgerToggle ${burgerIsOpen ? 'BurgerToggle--opened' : ''}`}
          onClick={burger}
        >
          <Icon name={burgerIsOpen ? 'cross' : 'burger-menu'} />
        </div>
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
  toggleBurger: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
  burgerIsOpen: isBurgerOpen(),
})

const mapDispatchToProps = (dispatch) => ({
  toggleBurger: (value) => dispatch(burgerToggle(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
