import React from 'react'
import OtherPartnerships from 'brand/components/OtherPartnerships'
import PartnersLogo from 'brand/components/PartnersLogo'
import PartnerHeader from './PartnerHeader'
import PartnerAdvantages from './PartnerAdvantages'

const Partner = () => (
  <div className="Partner">
    <PartnerHeader />
    <PartnerAdvantages />
    <OtherPartnerships />
    <PartnersLogo />
  </div>
)

export default Partner
