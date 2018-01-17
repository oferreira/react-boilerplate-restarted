import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import InjectDrupalMenu from 'drupal/hoc/InjectDrupalMenu'
import { Link } from 'react-router-dom'
import './styles.scss'

const Menu = ({
  items,
  row,
  column,
}) => {
  const classes = classNames(
    'Menu',
    {
      Menu__Row: row,
      Menu__Column: column,
    }
  )

  return (
    <ul className={classes}>
      {Object.keys(items).map((item) => (
        <li
          key={item}
          className="Menu__Item"
        >
          <Link to={items[item].uri}>{items[item].title}</Link>
        </li>
      ))}
    </ul>
  )
}

Menu.propTypes = {
  items: PropTypes.object,
  row: PropTypes.bool,
  column: PropTypes.bool,
}


export default InjectDrupalMenu(Menu)
