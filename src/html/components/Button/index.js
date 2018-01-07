import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Styled from './Styled'

const Button = ({
  children,
  disabled,
}) => {
  const classes = classNames('Button', {
    'Button--Disabled': disabled,
  })

  return (
    <Styled className={classes} disabled={disabled}>
      {children}
    </Styled>
  )
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
}

Button.defaultProps = {
  disabled: false,
}

export default Button
