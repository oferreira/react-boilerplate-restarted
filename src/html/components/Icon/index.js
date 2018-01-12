import React from 'react'
import PropTypes from 'prop-types'
import './Icon.scss'

const Icon = ({ name }) => (
  <i className={`icon icon-${name}`} />
)

Icon.propTypes = {
  name: PropTypes.string.isRequired,
}

Icon.defaultProps = {
  name: 'default',
}

export default Icon
