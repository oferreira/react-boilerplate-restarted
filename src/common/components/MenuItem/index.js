import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const MenuItem = ({
  item,
}) => (
  <li className="MenuItem">
    <Link className="MenuItemLink" to={item.alias || item.uri} title={item.title}>{item.title}</Link>
  </li>
)

MenuItem.propTypes = {
  item: PropTypes.object,
}

MenuItem.defaultProps = {
  item: {},
}

export default MenuItem
