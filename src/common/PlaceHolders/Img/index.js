import React from 'react'
import PropTypes from 'prop-types'

const Img = ({
  width,
  height,
  folder,
  name,
  title,
  classes,
}) => (
  <div>
    {(folder && name) ?
      <img
        src={`${folder}/${name}`}
        width={width}
        height={height}
        className={classes}
        alt={title || 'placeholder for images'}
      />
      :
      <img
        src={`http://via.placeholder.com/${width}x${height}`}
        className={classes}
        alt="placeholder for images"
      />
    }
  </div>
)

Img.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  folder: PropTypes.string,
  name: PropTypes.string,
  title: PropTypes.string,
  classes: PropTypes.string,
}

export default Img
