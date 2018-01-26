import React from 'react'
import OtherPartnerships from 'brand/components/OtherPartnerships'
import PartnersLogo from 'brand/components/PartnersLogo'
import ViewMiles from 'brand/components/ViewMiles'
import PartnerHeader from './PartnerHeader'
import MilesHeader from './MilesHeader'
import PartnerAdvantages from './PartnerAdvantages'

const Partner = () => (
  <div className="Partner">
    <PartnerHeader />
    <PartnerAdvantages />
    <OtherPartnerships />
    <MilesHeader />
    <PartnersLogo />
    <ViewMiles />
  </div>
)

export default Partner
