import React from 'react'
import Node from 'drupal/containers/Node'
import OtherPartnerships from './OtherPartnerships'
import './styles.scss'

const Partnerships = () => (
  <div className="Partnerships">
    <Node id={72} fields={['body']} />
    <OtherPartnerships />
  </div>
)

export default Partnerships
