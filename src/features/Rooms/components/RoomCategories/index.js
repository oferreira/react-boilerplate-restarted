import React from 'react'
import PropTypes from 'prop-types'

class RoomCategories extends React.PureComponent {
  static propTypes = {
    rooms: PropTypes.object.isRequired,
    bestPricesByFamily: PropTypes.object.isRequired,
    onSelectRooms: PropTypes.func,
  }

  static defaultProps = {
    onSelectRooms: () => {},
  }

  componentWillMount() {

  }

  render() {
    const {
      rooms,
      bestPricesByFamily,
      onSelectRooms,
    } = this.props

    return (
      <div>
        {Object.keys(rooms).map((roomType) => (
          <div key={roomType}>
            {roomType} - {bestPricesByFamily[roomType] && (bestPricesByFamily[roomType].price)}
            {Object.values(rooms[roomType]).map((roomsList) => (
              roomsList.slice(0, 1).map((room) => (
                <div key={room.id} onClick={() => onSelectRooms(roomsList)}>
                  CARD >> {room.roomCategoryTitle} - FROM {room.bestPricing.price}
                </div>
              ))
            ))}
          </div>
        ))}
      </div>
    )
  }
}

export default RoomCategories

