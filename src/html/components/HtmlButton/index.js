import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
// import './styles.scss'

const HtmlButton = ({
  children,
  disabled,
}) => {
  const classes = classNames('Button', {
    'Button--Disabled': disabled,
  })

  return (
    <button className={classes} disabled={disabled}>
      {children}
    </button>
  )
}

HtmlButton.propTypes = {
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
}

HtmlButton.defaultProps = {
  disabled: false,
}

export default HtmlButton
