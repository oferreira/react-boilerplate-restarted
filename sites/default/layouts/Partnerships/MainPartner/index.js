import React from 'react'
import PartnersList from '../PartnersList'
import './styles.scss'

const MainPartner = () => (
  <div className="MainPartner">
    <div className="MainPartner__Title">
      Our hotel partners
    </div>
    <PartnersList id="partnerships" limit={1} order="ASC" />
  </div>
)

export default MainPartner
