import React from 'react'
/* COMPONENTS
  ======================================== */
import H1 from 'common/components/H1'
import Button from 'common/components/Button'
/* PLACEHOLDERS
  ======================================== */
import Img from 'common/PlaceHolders/Img'
import Text from 'common/PlaceHolders/Text'

import './styles.scss'

const PartnerHeader = () => (
  <div className="PartnerHeader">
    <div className="PartnerHeader__Name">
      <H1 playful>PartnerName</H1>
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


export default PartnerHeader
