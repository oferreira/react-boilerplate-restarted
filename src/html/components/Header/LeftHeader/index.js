import React from 'react'
import PropTypes from 'prop-types'
import Logo from 'html/components/logo'
import Icon from 'html/components/Icon'
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
