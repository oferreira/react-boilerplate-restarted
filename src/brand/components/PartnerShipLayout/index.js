import React from 'react'
import PropTypes from 'prop-types'
import PartnerShipItem from 'brand/components/PartnerShipItem'
import './styles.scss'

const PartnerShipLayout = ({
  partnerships,
}) => {
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
    <div className="card-wrapper">
      { content }
    </div>
  )
}

PartnerShipLayout.propTypes = {
  partnerships: PropTypes.object,
}

export default PartnerShipLayout

