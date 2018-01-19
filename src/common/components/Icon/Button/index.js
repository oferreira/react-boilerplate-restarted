import React, { PropTypes } from 'react'
import Icon from 'components/Icon'
import classNames from 'classnames'

require('./styles.scss')

function IconButton({
  name, primary, tertiary, inverted, ...props
}) {
  const classes = classNames('IconButton', {
    'IconButton--primary': primary,
    'IconButton--tertiary': tertiary,
    'IconButton--inverted': inverted,
  })
  return (
    <button className={classes} {...props}>
      <Icon name={name} />
    </button>
  )
}

IconButton.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  /**
   * Set to true to display in primary color
   */
  primary: PropTypes.bool,
  /**
   * Set to true to display in tertiary color
   */
  tertiary: PropTypes.bool,
  /**
   * Invert color
   */
  inverted: PropTypes.bool,
  onClick: PropTypes.func,
}

IconButton.defaultProps = {
  name: 'default',
  onClick: () => null,
}

export default IconButton
