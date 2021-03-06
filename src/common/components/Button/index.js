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
  rounded,
  onClick,
  small,
}) => {
  const classes = classNames(
    'Button',
    {
      Button__Primary: primary,
      Button__Secondary: secondary,
      Button__Tertiary: tertiary,
      'Button--rounded': rounded,
      'Button--small': small,
    }
  )

  return (
    <button
      className={classes}
      onClick={disabled ? null : onClick}
      disabled={disabled}
    >
      <div className="Button__Label">
        {children}
      </div>
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  tertiary: PropTypes.bool,
  rounded: PropTypes.bool,
  small: PropTypes.bool,
  onClick: PropTypes.func,
}

Button.defaultProps = {
  disabled: false,
  primary: false,
  secondary: false,
  tertiary: false,
  rounded: false,
}

export default Button
