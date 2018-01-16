/*
 * SearchPage Messages
 *
 * This contains all the text for the SearchPage component.
 */
import { defineMessages } from 'react-intl'

export default defineMessages({
  title: {
    id: 'app.containers.TripAdvisor.title',
    defaultMessage: 'Reviews',
  },
  totalRate: {
    id: 'app.containers.TripAdvisor.totalRate',
    defaultMessage: 'Trip advisor note <b>{rate}/5</b> based on {totalReviews} reviews',
  },
  moreAvailable: {
    id: 'app.containers.TripAdvisor.moreAvailable',
    defaultMessage: 'More reviews available',
  },
  partner: {
    id: 'app.containers.TripAdvisor.partner',
    defaultMessage: 'In partnership with',
  },
})
