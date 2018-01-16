import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import InjectDrupalMenu from 'drupal/hoc/InjectDrupalMenu'
import './styles.scss'

const MenuList = ({ items }) => (
  <div className="MenuList">
    <ul className="MenuList__User">
      <li className="MenuList__Item">Log in</li>
      <li className="MenuList__Item">Sign up</li>
    </ul>
    <ul className="MenuList__Menu">
      {Object.keys(items).map((item) => (
        <li
          key={item}
          className="MenuList__Item"
        >
          <Link to={items[item].uri}>{items[item].title}</Link>
        </li>
      ))}
    </ul>
  </div>
)

MenuList.propTypes = {
  items: PropTypes.object,
}

export default InjectDrupalMenu(MenuList)
