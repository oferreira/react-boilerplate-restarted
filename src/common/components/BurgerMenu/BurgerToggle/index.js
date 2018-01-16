import React from 'react'
import PropTypes from 'prop-types'
import { isBurgerOpen } from 'common/selectors/burgerMenu'
import { burgerToggle } from 'common/actions/burgerMenu'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import Icon from 'common/components/Icon'
import './styles.scss'


const BurgerToggle = ({ burgerIsOpen, toggleBurger }) => {
  const burger = () => (
    toggleBurger(!burgerIsOpen)
  )

  return (
    <div
      className={`BurgerToggle ${burgerIsOpen ? 'BurgerToggle--opened' : ''}`}
      onClick={burger}
      onKeyUp={burger} // accessibility
      role="button"
      tabIndex={0}
    >
      <Icon name={burgerIsOpen ? 'cross' : 'burger-menu'} />
    </div>
  )
}


BurgerToggle.propTypes = {
  burgerIsOpen: PropTypes.bool,
  toggleBurger: PropTypes.func,
}


const mapStateToProps = createStructuredSelector({
  burgerIsOpen: isBurgerOpen(),
})

const mapDispatchToProps = (dispatch) => ({
  toggleBurger: (value) => dispatch(burgerToggle(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(BurgerToggle)
