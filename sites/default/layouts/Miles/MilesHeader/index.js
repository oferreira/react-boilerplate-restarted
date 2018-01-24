import React from 'react'
import Img from 'common/PlaceHolders/Img'
import Text from 'common/PlaceHolders/Text'

import './styles.scss'

const MilesHeader = () => (
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

  </div>
)

export default MilesHeader
