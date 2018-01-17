import React from 'react'
import PropTypes from 'prop-types'
import { isBurgerOpen } from 'common/selectors/burgerMenu'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import './styles.scss'

const RightHeader = ({ children, burgerIsOpen }) => (
  <div className={`RightHeader ${burgerIsOpen ? 'RightHeader--burgerOpen' : ''}`}>
    { children }
    <ul className="RightHeader__Links">
      <li className="RightHeader__Link">800 358 0846</li>
      <li className="RightHeader__Link">EN/€</li>
      <li className="RightHeader__Link">My booking</li>
      <li className="RightHeader__Link">Log in</li>
      <li className="RightHeader__Link">Sign up</li>
    </ul>
  </div>
)

RightHeader.propTypes = {
  children: PropTypes.node,
  burgerIsOpen: PropTypes.bool,
}

const mapStateToProps = createStructuredSelector({
  burgerIsOpen: isBurgerOpen(),
})

export default connect(mapStateToProps, null)(RightHeader)
