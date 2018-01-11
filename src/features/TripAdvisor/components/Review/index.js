/**
* TripAdvisor Review
*/
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

// other
import './styles.scss'

function Review({ review }) {
  return (
    <div className="TripAdvisorReview">
      <div className="md-hidden">
        <div className="TripAdvisorReview__Detail">
          <div className="TripAdvisorReview__Title">
            <div>{review.title}</div>
            <img src={review.rating_image_url} alt="" />
            <span className="TripAdvisorReview__Title__Date">{moment(review.published_date).format('DD MMM YYYY')}</span>
          </div>
        </div>
      </div>
      <div className="TripAdvisorReview__User">
        <img src={review.user.avatar.large.url} alt="" />
        <div className="TripAdvisorReview__User__Username">
          <div className="TripAdvisorReview__User__Username__Name">{review.user.username}</div>
          <div>{review.user.user_location.name}</div>
        </div>
      </div>
      <div className="TripAdvisorReview__Detail">
        <div className="TripAdvisorReview__Title">
          <div className="xs-hidden">
            <div>{review.title}</div>
            <img src={review.rating_image_url} alt="" />
            <span className="TripAdvisorReview__Title__Date">{moment(review.published_date).format('DD MMM YYYY')}</span>
          </div>
        </div>
        <div className="TripAdvisorReview__Text">
          {review.text}
        </div>
      </div>
    </div>
  )
}

Review.propTypes = {
  review: PropTypes.object.isRequired,
}

export default Review
