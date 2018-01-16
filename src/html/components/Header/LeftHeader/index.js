import React from 'react'
import PropTypes from 'prop-types'
import Logo from 'html/components/logo'
import './styles.scss'

const LeftHeader = ({ children }) => (
  <div className="LeftHeader">
    <Logo />
    {children}
  </div>
)

LeftHeader.propTypes = {
  children: PropTypes.node,
}

export default LeftHeader
