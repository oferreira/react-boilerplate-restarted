import React from 'react'

import H1 from 'common/components/H1'
import Button from 'common/components/Button'
import Img from 'common/PlaceHolders/Img'
import Text from 'common/PlaceHolders/Text'

import './styles.scss'

const Partner = () => (
  <div className="Partner">
    <div className="Partner__Name">
      <H1 playful> Partner Name </H1>
    </div>

    <div className="Partner__Image">
      <Img height={375} width={1280} />
    </div>

    <div className="Partner__Desc">
      <Text length={500} />
    </div>
    <Button rounded small>
      Go to Partner Name
    </Button>
  </div>
)

export default Partner
