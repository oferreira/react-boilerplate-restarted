import React from 'react'
import PartnersList from './PartnersList'
import './styles.scss'

const OtherPartnerships = () => (
  <div className="OtherPartnerships">
    <h3 className="OtherPartnerships__Title">Other partnerships</h3>
    <PartnersList id="partnerships" limit={3} order="DESC" />
  </div>
)

export default OtherPartnerships
