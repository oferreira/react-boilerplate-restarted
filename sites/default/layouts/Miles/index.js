import React from 'react'
import Img from 'common/PlaceHolders/Img'
import Text from 'common/PlaceHolders/Text'

import './styles.scss'

const logos = [
  { logo: 'air-france', title: 'Air France' },
  { logo: 'saudia', title: 'Saudia' },
  { logo: 'tunisair', title: 'Tunisair' },
  { logo: 'kuwait', title: 'Kuwait' },
  { logo: 'quatar', title: 'Qatar' },
  { logo: 'mea', title: 'MEA' },
  { logo: 'carig', title: 'Varig' },
  { logo: 'american-airlines', title: 'American Airlines' },
  { logo: 'oman-air', title: 'Oman Air' },
  { logo: 'ana', title: 'ANA' },
  { logo: 'ethiopian-air', title: 'Ethiopian Air' },
  { logo: 'gulf-air', title: 'Gulf Air' },
  { logo: 'czech', title: 'Czech Airlines' },
]

const logoContent = logos.map((val) => {
  const logoFile = `${val.logo}.png`
  return (
    <div
      key={val.logo}
      className="PartnerLogo__Image"
    >
      <Img
        height={50}
        width={150}
        folder="../../assets/images/logo-cards"
        name={logoFile}
        title={val.title}
      />
    </div>
  )
})

const Miles = () => (
  <div>
    <div className="PartnerHeader">
      <div className="PartnerHeader__Name">
        <h1>Miles reward program</h1>
      </div>

      <div className="PartnerHeader__Image">
        <Img height={375} width={1280} />
      </div>

      <div className="PartnerHeader__Desc">
        <Text length={400} />
      </div>
    </div>

    <div className="PartnerLink"><a href="/"> Missing Frequent flyers miles </a></div>

    <div className="PartnerLogo__Grid">
      <div className="PartnerLogo__Grid">
        <div className="PartnerLogo__Grid__Border__One"></div>
        {logoContent.filter((logo, ind) => ind <= 4)}
        <div className="PartnerLogo__Grid__Border__One"></div>
      </div>

      <div className="PartnerLogo__Grid">
        <div className="PartnerLogo__Grid__Border__One"></div>
        {logoContent.filter((logo, ind) => ind > 4 && ind <= 9)}
        <div className="PartnerLogo__Grid__Border__One"></div>
      </div>

      <div className="PartnerLogo__Grid">
        <div className="PartnerLogo__Grid__Border__Three"></div>
        {logoContent.filter((logo, ind) => ind > 9 && ind <= 12)}
        <div className="PartnerLogo__Grid__Border__Three"></div>
      </div>
    </div>
  </div>
)

export default Miles
