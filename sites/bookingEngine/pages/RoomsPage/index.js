import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'

// import { withSearchHotel, withAvailabiltiesHotel } from 'features/Hotels'
import { StayConfigurator } from 'features/Hotels'
// import withPayment from 'features/Payment'
import AppBar from 'components/AppBar'

import QueryBuilder from 'core/utils/urlQueryBuilder'

import withCart from 'features/Cart'
import withRooms from 'features/Rooms'
import RoomCategories from 'features/Rooms/components/RoomCategories'

import { CART_NAME } from 'constants.js'

require('./styles.scss')


export class RoomsPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    location: PropTypes.object,
    match: PropTypes.object,
    rooms: PropTypes.object,
    bestPricesByFamily: PropTypes.object,
    getRateFromCode: PropTypes.func,
    currentRoom: PropTypes.shape({
      selectedRooms: PropTypes.array,
      item: PropTypes.object,
    }),
    onSelectCurrentRoom: PropTypes.func,
    onClearCurrent: PropTypes.func,
    onSelectRooms: PropTypes.func,
    getFormattedRoom: PropTypes.func,
    roomsFetching: PropTypes.bool,
    roomsPicturesFetching: PropTypes.bool,
    onAddToCart: PropTypes.func,
  }

  componentWillMount() {
  }

  onSelectRatePlan = (rate) => {
    const {
      onClearCurrent,
      currentRoom,
      onAddToCart,
      getRateFromCode,
      getFormattedRoom,
      location,
      match,
    } = this.props

    // Add item to cart
    const rateJS = rate.toJS ? rate.toJS() : rate
    let ratePlanJS = getRateFromCode(rateJS.ratePlanCode)
    ratePlanJS = ratePlanJS.toJS ? ratePlanJS.toJS() : ratePlanJS

    const searched = {
      ...new QueryBuilder(location.search).getQuery(),
      ...match.params,
    }
    const roomItem = getFormattedRoom(currentRoom.item.room, { ...rateJS, ...ratePlanJS }, searched)
    onAddToCart(roomItem)

    // Clear the master state
    onClearCurrent()
  }

  render() {
    const {
      roomsFetching,
      roomsPicturesFetching,
      rooms,
      bestPricesByFamily,
      onSelectRooms,
      onSelectCurrentRoom,
      currentRoom,
      getRateFromCode,
    } = this.props

    const isFetching = roomsFetching || roomsPicturesFetching || false
    return (
      <div>
        <AppBar />
        {isFetching && (
          <div>
            LOADING...
          </div>
        )}
        {!isFetching && rooms && (
          <div>
            <RoomCategories
              rooms={rooms}
              bestPricesByFamily={bestPricesByFamily}
              onSelectRooms={onSelectRooms}
            />
          </div>
        )}
        {!isFetching && (
          <div style={{ marginTop: 20 }}>
            {currentRoom.selectedRooms && !currentRoom.item.room && (
              currentRoom.selectedRooms.map((room) => (
                <div key={room.id} onClick={() => onSelectCurrentRoom(room)}>{room.id}</div>
              ))
            )}
            {currentRoom.item.room && currentRoom.item.room.rateCodes && (
              currentRoom.item.room.rateCodes.map((rate) => (
                <div key={rate.ratePlanCode} onClick={() => this.onSelectRatePlan(rate)}>
                  {getRateFromCode(rate.ratePlanCode).name}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    )
  }
}

const connectCart = withCart({
  type: CART_NAME,
})

const connectRooms = withRooms({
  getQuery: (props) => ({
    ...new QueryBuilder(props.location.search).getQuery(),
    ...props.match.params,
  }),
  getCart: (props) => props.cart,
  enableSorted: true,
  enableGallery: true,
})

export default compose(
  connectCart,
  connectRooms,
)(RoomsPage)
