import React from 'react'
import PropTypes from 'prop-types'
import className from 'classnames'
import './style.scss'

const H1 = ({ children, playful }) => {
  const classes = className(
    'H1',
    { H1__Playful: playful }
  )

  return (
    <h1 className={classes}>
      {children}
    </h1>
  )
}

H1.propTypes = {
  children: PropTypes.node,
  playful: PropTypes.bool,
}

export default H1
