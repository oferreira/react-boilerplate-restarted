import React from 'react'
import MilesHeader from './MilesHeader'
import MilesAdvantages from './MilesAdvantages'

import './styles.scss'

const Miles = () => (
  <div>
    <MilesHeader />
    <div className="PartnerLink"><a href="/"> Missing Frequent flyers miles </a></div>
    <MilesAdvantages />
  </div>
)

export default Miles
