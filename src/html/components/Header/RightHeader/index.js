import React from 'react'
import PropTypes from 'prop-types'
import './styles.scss'

const RightHeader = ({ children }) => (
  <div className="RightHeader">
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
}

export default RightHeader
