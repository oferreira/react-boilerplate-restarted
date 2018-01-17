import React from 'react'
import PropTypes from 'prop-types'
import CardItem from 'brand/components/CardItem'
import './styles.scss'

const CardLayout = ({
  partnerships,
}) => {
  const content = Object.keys(partnerships).map((id) => {
    const partner = partnerships[id]

    return (
      <CardItem
        key={partner.uri}
        image="image.jpg"
        title={partner.title}
        description={partner.body}
      />
    )
  })

  return (
    <div className="card-wrapper">
      { content }
    </div>
  )
}

CardLayout.propTypes = {
  partnerships: PropTypes.Object,
}

export default CardLayout

