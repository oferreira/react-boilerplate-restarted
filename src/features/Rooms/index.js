import React from 'react'
import PropTypes from 'prop-types'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import injectReducer from 'core/reducers/utils/injectReducer'
import injectSaga from 'core/sagas/utils/injectSaga'

// Rooms import
import {
  requestRoomsAvailabilities,
  requestRoomsGallery,
} from './actions'

import {
  getRoomWithFeatures,
  makeSelectRoomsByFamily,
  makeSelectRatePlansByRoomTypes,
  getRoomsFetching,
  getRoomsPictures,
  makeSelectBestPricesByFamily,
  getRoomsPicturesFetching,
  getRateFromCodeSorted,
  formatSelectedRoom,
} from './selectors'

import reducer from './reducers'
import saga from './sagas'
import { ROOM_STORE_NAME } from './constants'
import { NO_ID_GALLERY, NO_QUERY } from './constants/errors'

export default ({
  getQuery,
  enableSorted,
  enableGallery,
  getCart,
}) => (WrappedComponent) => {
  if (!getQuery) {
    return console.error(NO_QUERY)
  }

  class Rooms extends React.PureComponent {
    static propTypes = {
      roomsFetching: PropTypes.bool,
      onRequestRooms: PropTypes.func.isRequired,
      onRequestGallery: PropTypes.func.isRequired,
      location: PropTypes.object,
      match: PropTypes.object,
      rooms: PropTypes.object,
      roomsByFamily: PropTypes.object,
      roomsRatePlans: PropTypes.object,
    }

    state = {
      selectedRooms: [],
      item: {
        room: null,
        bedding: null,
        ratePlan: null,
      },
    }

    componentWillMount() {
      const { onRequestRooms, onRequestGallery } = this.props

      const params = getQuery(this.props)
      const id = params.id || params.resortCode || params.resortId
      onRequestRooms(params)

      if (enableGallery && id) {
        onRequestGallery(id)
      } else if (enableGallery && !id) {
        console.error(NO_ID_GALLERY)
      }
    }

    onSelectRooms = (selectedRooms) => {
      this.setState({ selectedRooms })
    }

    onSelectCurrentRoom = (room) => {
      this.setState({ item: { ...this.state.item, room } })
    }

    onSelectCurrentBedding = (bedding) => {
      this.setState({ item: { ...this.state.item, bedding } })
    }

    onSelectCurrentRatePlan = (ratePlan) => {
      this.setState({ item: { ...this.state.item, ratePlan } })
    }

    onClearCurrent = () => this.setState({ selectedRooms: [], item: { room: null, bedding: null, ratePlan: null } })

    render() {
      const {
        rooms,
        roomsByFamily,
        roomsRatePlans,
        onRequestRooms, // eslint-disable-line
        onRequestGallery, // eslint-disable-line
        ...props
      } = this.props

      const customProps = {
        ...props,
        rooms: enableSorted ? roomsByFamily : rooms,
        onSelectRooms: this.onSelectRooms,
        onSelectCurrentRoom: this.onSelectCurrentRoom,
        onSelectCurrentBedding: this.onSelectCurrentBedding,
        onSelectCurrentRatePlan: this.onSelectCurrentRatePlan,
        onClearCurrent: this.onClearCurrent,
        getFormattedRoom: formatSelectedRoom,
        getRateFromCode: (code) => getRateFromCodeSorted(roomsRatePlans, code),
        currentRoom: { ...this.state },
      }
      return <WrappedComponent {...customProps} />
    }
  }

  Rooms.WrappedComponent = WrappedComponent
  Rooms.displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component'

  const mapStateToProps = (state, ownProps) => createStructuredSelector({
    roomsFetching: getRoomsFetching,
    rooms: getRoomWithFeatures,
    roomsRatePlans: makeSelectRatePlansByRoomTypes,
    roomsPictures: getRoomsPictures,
    roomsPicturesFetching: getRoomsPicturesFetching,
    roomsByFamily: makeSelectRoomsByFamily(getCart ? getCart(ownProps) : [], getQuery(ownProps).rooms),
    bestPricesByFamily: makeSelectBestPricesByFamily(getCart ? getCart(ownProps) : [], getQuery(ownProps).rooms),
  })

  const mapDispatchToProps = (dispatch) => ({
    onRequestRooms: (payload) => dispatch(requestRoomsAvailabilities(payload)),
    onRequestGallery: (id) => dispatch(requestRoomsGallery(id)),
  })

  const withConnect = connect(mapStateToProps, mapDispatchToProps)

  const withReducer = injectReducer({ key: ROOM_STORE_NAME, reducer })
  const withSaga = injectSaga({ key: ROOM_STORE_NAME, saga })

  return compose(
    withReducer,
    withSaga,
    withConnect,
  )(Rooms)
}
