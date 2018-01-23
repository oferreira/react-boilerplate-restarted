import React from 'react'
import PropTypes from 'prop-types'
import './styles.scss'

const CardItem = ({
  // image,
  title,
  description,
}) => (
  <div className="card-item-wrapper">
    {/* <div className="card-item-img"><img scr={`src/assets/images/${image}`} alt={image} /></div> */}
    <div className="card-item-img">

    </div>
    <div className="card-item-title">{title}</div>
    <div className="card-item-desc">{description}</div>
  </div>
)

CardItem.propTypes = {
  // image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
}


export default CardItem

