import React from 'react'
import PropTypes from 'prop-types'
import './styles.scss'

const SmallCard = ({ image, title, text }) => {
  const limitedText = `${text.substring(0, 147)}...`
  return (
    <div className="SmallCard">
      {image &&
      <img src={image.url} alt={image.alt} />
      }
      <div className="SmallCard__Title">
        {title}
      </div>
      <div className="SmallCard__Text">
        {limitedText}
      </div>
    </div>
  )
}

SmallCard.propTypes = {
  image: PropTypes.shape({
    url: PropTypes.string,
    alt: PropTypes.string,
  }),
  title: PropTypes.string,
  text: PropTypes.string,
}

export default SmallCard
