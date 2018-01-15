import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'html/components/Icon'
import Menu from 'drupal/containers/Menu'

import './styles.scss'

const Footer = ({
  menuId,
}) => (
  <div className="Footer">
    <div className="Footer__Scissors">
      <Icon name="scissors" />
    </div>
    <Menu id={menuId} />
    <div className="Logos">
      <div className="LogoList">
        <div className="Logo"><i className="icon icon-royal-tulip"></i></div>
        <div className="Logo"><i className="icon icon-golden-tulip-2line"></i></div>
        <div className="Logo"><i className="icon icon-metropolo"></i></div>
        <div className="Logo"><i className="icon icon-sarovar"></i></div>
        <div className="Logo"><i className="icon icon-campanile"></i></div>
        <div className="Logo"><i className="icon icon-kyriad"></i></div>
        <div className="Logo"><i className="icon icon-tulip-inn"></i></div>
        <div className="Logo"><i className="icon icon-jinjiang-inn"></i></div>
        <div className="Logo"><i className="icon icon-premiere-classe"></i></div>
        <div className="Logos__LHGLogo"></div>
      </div>
    </div>
  </div>
)

Footer.propTypes = {
  menuId: PropTypes.string,
}

Footer.defaultProps = {}

export default Footer
