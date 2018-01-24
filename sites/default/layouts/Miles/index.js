import React from 'react'
import MilesHeader from './MilesHeader'
import MilesPartners from './MilesPartners'
import MilesAdvantages from './MilesAdvantages'

import './styles.scss'

const Miles = () => (
  <div>
    <MilesHeader />
    <div className="PartnerLink"><a href="/"> Missing Frequent flyers miles </a></div>
    <MilesPartners />
    <MilesAdvantages />
  </div>
)

export default Miles
