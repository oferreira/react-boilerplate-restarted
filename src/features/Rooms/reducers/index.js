/*
 *
 * Hotels reducer
 *
 */

import { fromJS } from 'immutable'
import {
  REQUEST_ROOMS_AVAILABILITIES,
  REQUEST_ROOMS_AVAILABILITIES_SUCCESS,
  REQUEST_ROOMS_AVAILABILITIES_ERROR,
  REQUEST_ROOMS_FEATURES_SUCCESS,
  REQUEST_ROOMS_FEATURES_ERROR,
  REQUEST_ROOMS_GALLERY,
  REQUEST_ROOMS_GALLERY_SUCCESS,
  REQUEST_ROOMS_GALLERY_ERROR,
} from '../constants'

const initialState = fromJS({
  currentResortCode: null,
  fetching: false,
  error: null,
  roomList: [],
  ratePlans: [],
  roomsFeatures: [],
  gallery: fromJS({
    pictures: {},
    fetching: false,
  }),
})

function RoomsReducer(state = initialState, { type, payload }) {
  switch (type) {
    case REQUEST_ROOMS_AVAILABILITIES:
      return state.merge({ currentResortCode: payload.query.resortId, fetching: true, error: null })
    case REQUEST_ROOMS_GALLERY:
      return state.setIn(['gallery', 'fetching'], true)
    case REQUEST_ROOMS_AVAILABILITIES_SUCCESS:
      return state
        .set('roomList', payload.rooms)
        .set('ratePlans', payload.ratePlans)
    case REQUEST_ROOMS_FEATURES_SUCCESS:
      return state
        .set('roomsFeatures', payload.roomsFeatures)
        .set('fetching', false)
    case REQUEST_ROOMS_GALLERY_SUCCESS:
      return state
        .setIn(['gallery', 'pictures'], payload.pictures)
        .setIn(['gallery', 'fetching'], false)
    case REQUEST_ROOMS_AVAILABILITIES_ERROR:
    case REQUEST_ROOMS_FEATURES_ERROR:
      return state.merge({ fetching: false, error: payload.error })
    case REQUEST_ROOMS_GALLERY_ERROR:
      return state.setIn(['gallery', 'fetching'], false)
    default:
      return state
  }
}

export default RoomsReducer
