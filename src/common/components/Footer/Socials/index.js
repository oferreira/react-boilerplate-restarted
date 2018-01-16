/* global config */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import Network from './Network'

import './styles.scss'

const Socials = ({ links }) => (
  <div className="Socials">
    {/* <span className="Socials__Title">Follow us</span> */}
    <div className="Socials__Networks">
      {Object.keys(links).map((network, index) => (
        <Network key={index} name={network} url={links[network]} />
      ))}
    </div>
  </div>
)

Socials.propTypes = {
  links: PropTypes.object.isRequired,
}

const mapStateToProps = createSelector(
  () => ({
    links: config.socials,
  }),
)

export default connect(mapStateToProps)(Socials)
