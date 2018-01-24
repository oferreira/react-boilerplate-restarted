import React from 'react'
import Nodes from 'drupal/containers/Nodes'
import Node from 'drupal/containers/Node'
import PartnerHeader from './PartnerHeader'
import PartnerAdvantages from './PartnerAdvantages'

const Partner = () => (
  <div className="Partner">
    <Nodes id="reassurance_messages" />
    <Node id={21} />
    <PartnerHeader />
    <PartnerAdvantages />
  </div>
)

export default Partner
