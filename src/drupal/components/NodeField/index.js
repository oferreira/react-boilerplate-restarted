import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const NodeField = ({
  name,
  value,
}) => {
  const classes = classNames(`NodeField ${name}`)

  if (name === 'meta_tags') return null

  if (typeof value.alt !== 'undefined') {
    return (
      <div className={classes}>
        <img
          className="NodeField--Image"
          src={value.url}
          alt={value.alt}
        />
      </div>
    )
  }

  return <div className={classes} dangerouslySetInnerHTML={{ __html: value }}></div>
}

NodeField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
}

export default NodeField
