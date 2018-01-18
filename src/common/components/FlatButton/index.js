/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './styles.scss'

const Button = ({
  children,
  disabled,
  primary,
  secondary,
  tertiary,
  onClick,
  icon,
  iconPosition,
}) => {
  const classes = classNames('FlatButton', {
    FlatButton__Primary: primary,
    FlatButton__Secondary: secondary,
    FlatButton__Tertiary: tertiary,
    'FlatButton--Disabled': disabled,
  })

  return (
    <div
      className={classes}
      onClick={disabled ? null : onClick}
    >
      {icon && iconPosition === 'left' && (
        <span>{icon}</span>
      )}
      <div className="FlatButton__Label">
        {children}
      </div>
      {icon && iconPosition === 'right' && (
        <span>{icon}</span>
      )}
    </div>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  tertiary: PropTypes.bool,
  onClick: PropTypes.func,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
}

Button.defaultProps = {
  disabled: false,
  primary: false,
  secondary: false,
  tertiary: false,
  iconPosition: 'left',
}

export default Button
