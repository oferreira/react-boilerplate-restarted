/**
*
* Small Expand Component
* Toggle a block
*/

import React from 'react'
import PropTypes from 'prop-types'

/*
 * Custom imports
 */
import Icon from 'components/Icon'
import FlatButton from 'components/Button/Flat'
require('../styles.scss')

const Header = ({
  children,
  title,
  icon,
  rightButton,
  rightButtonClick,
  primary,
  ...props
}) => (
  <div className={`Expand__Header ${primary ? 'Expand__Header-primary' : ''}`} {...props}>
    <Icon name={icon} /><span className="Expand__Header__Title">{title}</span>
    <div>{children}</div>
    {rightButton &&
      <FlatButton className="Expand__Header__Button" label={rightButton} onClick={rightButtonClick} />
    }
  </div>
)

Header.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.string,
  title: PropTypes.string,
  rightButton: PropTypes.string,
  rightButtonClick: PropTypes.func,
  primary: PropTypes.bool,
}

Header.defaultProps = {
}

export default Header

