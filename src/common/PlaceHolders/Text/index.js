import React from 'react'
import PropTypes from 'prop-types'
import loremIpsum from './loremIpsum'

const Text = ({ length }) => {
  const lorem = loremIpsum.substring(0, length)
  return <span>{lorem}</span>
}

Text.propTypes = {
  length: PropTypes.number,
}

export default Text
