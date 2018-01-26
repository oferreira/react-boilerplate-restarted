import React from 'react'
/* COMPONENTS
  ======================================== */
import Button from 'common/components/Button'
/* PLACEHOLDERS
  ======================================== */
import Img from 'common/PlaceHolders/Img'
import Text from 'common/PlaceHolders/Text'

import './styles.scss'

const MilesHeader = () => (
  <div className="PartnerHeader">
    <div className="PartnerHeader__Logo"><img src="../../assets/partnersLogo/miles-logo.png" alt="Miles" /></div>
    <div className="PartnerHeader__Name">
      <h1>Miles reward program</h1>
    </div>

    <div className="PartnerHeader__Image">
      <Img height={375} width={1280} />
    </div>

    <div className="PartnerHeader__Desc">
      <Text length={400} />
    </div>
    <Button rounded small>
      Go to PartnerName
    </Button>
  </div>
)


export default MilesHeader
