import React from 'react'
import PropTypes from 'prop-types'
import InjectDrupalNodes from 'drupal/hoc/InjectDrupalNodes'
import SmallCard from 'brand/components/SmallCard'
import './styles.scss'


const PartnersList = ({ items }) => (
  <div className="PartnerList">
    {items.map((item, key) => (
      <SmallCard image={item.field_image} text={item.body} title={item.title} key={key} />
    ))}
  </div>
)

PartnersList.propTypes = {
  items: PropTypes.array,
}

export default InjectDrupalNodes(PartnersList)
