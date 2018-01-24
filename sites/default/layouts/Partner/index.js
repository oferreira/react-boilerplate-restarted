import React from 'react'
import Nodes from 'drupal/containers/Nodes'
import PartnerHeader from './PartnerHeader'
import PartnerAdvantages from './PartnerAdvantages'

const Partner = () => (
  <div className="Partner">
    <Nodes id="reassurance_messages" />
    <PartnerHeader />
    <PartnerAdvantages />
  </div>
)

export default Partner
