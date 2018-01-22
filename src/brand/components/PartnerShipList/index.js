import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import PartnerShipItem from 'brand/components/PartnerShipItem'
import './styles.scss'

const PartnerShipLayout = ({
  partnerships,
  title,
  numberOfCards,
}) => {
  const classes = classNames({
    'card-wrapper': true,
    'one-card': numberOfCards === 1,
    'two-cards': numberOfCards === 2,
    'three-cards': numberOfCards !== 1 && numberOfCards !== 2,
  })

  const content = partnerships.map((val, id) => {
    const partner = partnerships[id]

    return (
      <PartnerShipItem
        key={id}
        image="image.jpg"
        title={partner.title}
        description={partner.body}
      />
    )
  })

  return (
    <div>
      {title && <h1 className="partnership-title">{title}</h1>}
      <div
        className={classes}
      >
        {content}
      </div>
    </div>
  )
}

PartnerShipLayout.propTypes = {
  partnerships: PropTypes.object.isRequired,
  title: PropTypes.string,
  numberOfCards: PropTypes.number,
}

export default PartnerShipLayout

