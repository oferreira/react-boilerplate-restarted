import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import DateCard from 'common/components/DateCard'
import './styles.scss'

const ArticleCard = ({
  image,
  title,
  date,
  description,
  simple,
}) => {
  const classes = classNames(
    'ArticleCard',
    { 'ArticleCard--grey': simple }
  )

  return (
    <div className={classes}>
      {image && !simple &&
        <img src={image.url} alt={image.alt} />
      }
      <div className="ArticleCard__Date">
        <DateCard date={date} />
      </div>
      <div className="ArticleCard__Title">
        {title}
      </div>
      {simple &&
        <div className="ArticleCard__Desc">
          {description}
        </div>
      }
    </div>
  )
}

ArticleCard.propTypes = {
  image: PropTypes.shape({
    url: PropTypes.string,
    alt: PropTypes.string,
  }),
  title: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
  simple: PropTypes.bool,
}

export default ArticleCard
