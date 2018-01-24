import React from 'react'
import Advantage from '../../Partner/PartnerAdvantages/Advantage'

import './styles.scss'

const MilesAdvantages = () => (
  <div className="PartnerAdvantages">
    <h2 className="PartnerAdvantages__Title">Your advantages</h2>
    <div className="PartnerAdvantages__List">
      <Advantage />
      <Advantage />
      <Advantage />
      <Advantage />
      <Advantage />
    </div>
  </div>
)

export default MilesAdvantages
