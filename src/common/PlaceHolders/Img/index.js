import React from 'react'
import PropTypes from 'prop-types'

const Img = ({ width, height }) => (
  <img src={`http://via.placeholder.com/${width}x${height}`} alt="placeholder for images" />
)

Img.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}

export default Img
