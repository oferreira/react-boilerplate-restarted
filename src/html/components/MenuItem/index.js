import React from 'react'
import PropTypes from 'prop-types'

const MenuItem = ({
  item,
  children,
}) => (
  <li className="MenuItem">
    {item.title}
    {children}
  </li>
)

MenuItem.propTypes = {
  children: PropTypes.object,
  item: PropTypes.object,
}

MenuItem.defaultProps = {
  item: {},
}

export default MenuItem
