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
  action,
}) => {
  const classes = classNames(
    {
      Button__Primary: primary,
      Button__Secondary: secondary,
      Button__Tertiary: tertiary,
    }
  )

  return (
    <button
      className={
        `Button
        ${classes}
        ${rounded ? 'Button--rounded' : ''}`
      }
      onClick={disabled ? null : action}
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
  action: PropTypes.func,
}

Button.defaultProps = {
  disabled: false,
  primary: false,
  secondary: false,
  tertiary: false,
  rounded: false,
  action: null,
}

export default Button
