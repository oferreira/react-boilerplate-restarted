import React from 'react'
import './styles.scss'

const imgUrl = '../../assets/partnersLogo/'

const PartnersLogo = () => (
  <div className="PartnersLogo__Container">
    <div className="PartnersLogo__Row">
      <div className="PartnersLogo__Row__logo"><img src={`${imgUrl}air-france.png`} alt="Air France" /> </div>
      <div className="PartnersLogo__Row__logo"><img src={`${imgUrl}saudia.png`} alt="Saudia" /> </div>
      <div className="PartnersLogo__Row__logo"><img src={`${imgUrl}tunisair.png`} alt="Tunisair" /> </div>
      <div className="PartnersLogo__Row__logo"><img src={`${imgUrl}kuwait.png`} alt="Kuwait" /> </div>
      <div className="PartnersLogo__Row__logo"><img src={`${imgUrl}qatar.png`} alt="Qatar" /> </div>
    </div>
    <div className="PartnersLogo__Row">
      <div className="PartnersLogo__Row__logo"><img src={`${imgUrl}mea.png`} alt="MEA" /></div>
      <div className="PartnersLogo__Row__logo"><img src={`${imgUrl}Varig.png`} alt="Varig" /></div>
      <div className="PartnersLogo__Row__logo"><img src={`${imgUrl}american-airlines.png`} alt="American Airlines" /></div>
      <div className="PartnersLogo__Row__logo"><img src={`${imgUrl}oman-air.png`} alt="Oman Air" /></div>
      <div className="PartnersLogo__Row__logo"><img src={`${imgUrl}ana.png`} alt="ANA" /></div>
    </div>
    <div className="PartnersLogo__Row">
      <div className="PartnersLogo__Row__logo"><img src={`${imgUrl}ethiopian-air.png`} alt="Ethiopian Air" /></div>
      <div className="PartnersLogo__Row__logo"><img src={`${imgUrl}gulf-air.png`} alt="Gulf Air" /></div>
      <div className="PartnersLogo__Row__logo"><img src={`${imgUrl}czech.png`} alt="Czech Airlines" /></div>
    </div>
  </div>
)

export default PartnersLogo
