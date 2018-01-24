import React from 'react'
import MilesHeader from './MilesHeader'
import MilesPartners from './MilesPartners'

import './styles.scss'

const Miles = () => (
  <div>
    <MilesHeader />
    <div className="PartnerLink"><a href="/"> Missing Frequent flyers miles </a></div>
    <MilesPartners />
  </div>
)

export default Miles
