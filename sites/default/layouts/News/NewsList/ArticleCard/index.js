import React from 'react'
import PropTypes from 'prop-types'
import DateCard from 'common/components/DateCard'
import './styles.scss'

const ArticleCard = ({
  image,
  title,
  date,
}) => (
  <div className="ArticleCard">
    {image &&
      <img src={image.url} alt={image.alt} />
    }
    <div className="ArticleCard__Date">
      <DateCard date={date} />
    </div>
    <div className="ArticleCard__Title">
      {title}
    </div>
  </div>
)

ArticleCard.propTypes = {
  image: PropTypes.shape({
    url: PropTypes.string,
    alt: PropTypes.string,
  }),
  title: PropTypes.string,
  date: PropTypes.string,
}

export default ArticleCard
