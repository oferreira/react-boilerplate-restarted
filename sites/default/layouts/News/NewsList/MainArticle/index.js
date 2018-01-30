import React from 'react'
import PropTypes from 'prop-types'
import DateCard from 'common/components/DateCard'
import './styles.scss'

const MainArticle = ({
  image,
  title,
  date,
  description,
}) => {
  const limitedText = `${description.substring(0, 500)}...`

  return (
    <div className="MainArticle">
      <div className="MainArticle__Img">
        {image &&
          <img src={image.url} alt={image.alt} />
        }
      </div>

      <div className="MainArticle__Info">
        <div className="MainArticle__Info__Wrapper">
          <div className="MainArticle__Date">
            <DateCard date={date} />
          </div>

          <div className="MainArticle__Title">
            {title}
          </div>

          <div className="MainArticle__Description">
            {limitedText}
          </div>

          <div className="MainArticle__Link">
            Read this article
          </div>
        </div>
      </div>
    </div>
  )
}

MainArticle.propTypes = {
  image: PropTypes.shape({
    url: PropTypes.string,
    alt: PropTypes.string,
  }),
  title: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
}

export default MainArticle
