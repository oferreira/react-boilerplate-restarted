/*
 *
 * TripAdvisor
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import injectReducer from 'core/reducers/utils/injectReducer'
import injectSaga from 'core/sagas/utils/injectSaga'

// Components
import FormattedMessage from 'components/FormattedMessage'
import Reviews from './components/Reviews'
import reducer from './reducers'
import saga from './sagas'

// Selectors
import { selectTripAdvisorRating, selectTripAdvisorFetching, selectTripAdvisorError } from './selectors'

// Actions
import { requestRating } from './actions'
import messages from './messages'

import './styles.scss'

export class TripAdvisor extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    rating: PropTypes.object,
    fetching: PropTypes.bool,
    error: PropTypes.bool,
    getRating: PropTypes.func.isRequired,
    isChina: PropTypes.bool,
  }

  static defaultProps = {
    isChina: false,
  }

  componentWillMount() {
    if (!this.props.isChina) {
      this.props.getRating(this.props.id)
    }
  }

  render() {
    const {
      rating,
      error,
      fetching,
      id,
    } = this.props

    // There are an error or component is fetching, display a 0 bubble rate
    if (error || fetching) {
      return (
        <div className="Tripadvisor__Rates">
          <div className="Tripadvisor__Rates--disabled">
            <img src="http://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/0.0-MCID-5.png" alt="" />
          </div>
        </div>
      )
    }

    // Do not display a 0 bubble rate if there is a bad rating
    if (!rating) {
      return null
    }

    const content = (
      <Reviews
        reviews={rating.reviews}
        ratingUrl={rating.rating_image_url}
        totalReviews={rating.num_reviews}
        rate={rating.rating}
      />
    )

    return (
      <div className="Tripadvisor__Rates">
        {/* <Toggle name={`toggle-${id}`}>
          <img src={rating.rating_image_url} alt="" />
          <span className="Tripadvisor__Rates__Note">{rating.num_reviews} <FormattedMessage {...messages.title} /></span>
        </Toggle>
        <Modal name={`toggle-${id}`} title={<FormattedMessage {...messages.title} />} bgColor="#fff">
          {content}
        </Modal> */}
        <img src={rating.rating_image_url} alt="" />
        <span className="Tripadvisor__Rates__Note">{rating.num_reviews} <FormattedMessage {...messages.title} /></span>
      </div>
    )
  }
}

const mapStateToProps = (state, { id }) => createStructuredSelector({
  rating: selectTripAdvisorRating(id),
  fetching: selectTripAdvisorFetching(id),
  error: selectTripAdvisorError(id),
})

function mapDispatchToProps(dispatch) {
  return {
    getRating: (id) => dispatch(requestRating(id)),
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

const withReducer = injectReducer({ key: 'tripAdvisor', reducer })
const withSaga = injectSaga({ key: 'tripAdvisor', saga })

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TripAdvisor)
