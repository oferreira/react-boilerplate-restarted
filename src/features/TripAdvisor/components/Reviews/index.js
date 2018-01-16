/**
* TripAdvisor Review
*/

import React from 'react'
import PropTypes from 'prop-types'
import { FormattedHTMLMessage } from 'react-intl'
import FormattedMessage from 'components/FormattedMessage'

// components
import Review from '../Review'

// other
import messages from '../../messages'
import './styles.scss'

function Reviews({
  reviews,
  rate,
  ratingUrl,
  totalReviews,
}) {
  return (
    <div className="TripAdvisorReviews">
      <div className="TripAdvisorReviews__Title">
        <img src={ratingUrl} alt="" />
        <div><FormattedHTMLMessage {...messages.totalRate} values={{ rate, totalReviews }} /></div>
      </div>
      <div className="TripAdvisorReviews__Reviews">
        {reviews.map((r) => (
          <Review key={r.id} review={r} />
        ))}
      </div>
      <div className="TripAdvisorReviews__More">
        <span className="TripAdvisorReviews__More__Partner">
          <FormattedMessage {...messages.partner} />
          <img src="https://static.tacdn.com/img2/branding/rebrand/TA_logo_primary.svg" alt="" className="TripAdvisorReviews__More__Partner__Img" />
        </span>
      </div>
    </div>
  )
}

Reviews.propTypes = {
  reviews: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  ratingUrl: PropTypes.string,
  totalReviews: PropTypes.string,
  rate: PropTypes.string,
}

Reviews.defaultProps = {
  reviews: [],
  ratingUrl: '',
  rate: 0,
  totalReviews: 0,
}

export default Reviews
