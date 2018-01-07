import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './styles.scss'

const HtmlButton = ({
  children,
  disabled,
}) => {
  const classes = classNames('Button', {
    'Button--Disabled': disabled,
  })

  return (
    <div>

      <div className="container">
        <div className="row">
          <div className="test1">
              test 1
          </div>
          <div className="test2">
              test 2
          </div>
        </div>
      </div>

      <button className={classes} disabled={disabled}>
        {children}
      </button>
    </div>
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
