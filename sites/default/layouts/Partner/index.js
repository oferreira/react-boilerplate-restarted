import React from 'react'
import OtherPartnerships from 'brand/components/OtherPartnerships'
import PartnersLogo from 'brand/components/PartnersLogo'
import PartnerHeader from './PartnerHeader'
import MilesHeader from './MilesHeader'
import PartnerAdvantages from './PartnerAdvantages'

const Partner = () => (
  <div className="Partner">
    <PartnerHeader />
    <PartnerAdvantages />
    <OtherPartnerships />
    <PartnersLogo />
    <MilesHeader />
  </div>
)

export default Partner
