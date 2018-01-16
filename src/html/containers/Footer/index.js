import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'html/components/Icon'
import Menu from 'drupal/containers/Menu'

import './styles.scss'

const Footer = ({
  menuId,
}) => (
  <div className="FooterWrapper">
    <Menu id={menuId} />
    <div className="FooterWrapper__Logo">
      <div className="FooterWrapper__LogoLists">
        <div className="FooterWrapper__item"><Icon name="royal-tulip" /></div>
        <div className="FooterWrapper__item"><Icon name="golden-tulip-2line" /></div>
        <div className="FooterWrapper__item"><Icon name="metropolo" /></div>
        <div className="FooterWrapper__item"><Icon name="sarovar" /></div>
        <div className="FooterWrapper__item"><Icon name="campanile" /></div>
        <div className="FooterWrapper__item"><Icon name="kyriad" /></div>
        <div className="FooterWrapper__item"><Icon name="tulip-inn" /></div>
        <div className="FooterWrapper__item"><Icon name="jinjiang-inn" /></div>
        <div className="FooterWrapper__item"><Icon name="premiere-classe" /></div>
        <div className="FooterWrapper__item--LHGLogo"></div>
      </div>
    </div>
  </div>
)

Footer.propTypes = {
  menuId: PropTypes.string,
}

Footer.defaultProps = {}

export default Footer
