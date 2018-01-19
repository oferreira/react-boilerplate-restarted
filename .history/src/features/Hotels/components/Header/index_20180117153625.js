/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './styles.scss'

const Header = ({
  title,
  leftIcon,
  rightIcon,
  className,
  onClick,
  upper,
}) => (
  <div className={classnames('HeaderHotel', { [className]: className })} onClick={onClick}>
    {title && (
      <div className={classnames('HeaderHotel__Title', { 'HeaderHotel__Title--Upper': upper })}>
        {leftIcon && (leftIcon)}
        {title}
      </div>
    )}
    {rightIcon && (rightIcon)}
  </div>
)

Header.propTypes = {
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  upper: PropTypes.bool,
}

Header.defaultProps = {
}

export default Header

