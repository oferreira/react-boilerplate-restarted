import React from 'react'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import InjectDrupalMenu from 'drupal/hoc/InjectDrupalMenu'
import './styles.scss'

const MenuList = ({ items }) => (
  <ul className="MenuList">
    {Object.keys(items).map((item, key) => (
        <li
          key={key}
          className="MenuList__Item"
        >
          <Link to={items[item].uri}>{items[item].title}</Link>
        </li>
      ))}
  </ul>
)

export default compose(InjectDrupalMenu)(MenuList)
