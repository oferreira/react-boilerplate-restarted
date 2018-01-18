import React from 'react'
import Advantage from './Advantage'
import './styles.scss'

const PartnerAdvantages = () => (
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

export default PartnerAdvantages
