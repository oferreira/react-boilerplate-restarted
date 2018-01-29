import React from 'react'
import Text from 'common/PlaceHolders/Text'

import './styles.scss'

const NewsHeader = () => (
  <div className="NewsHeader">
    <div className="NewsHeader__Name">
      <h1>Our news</h1>
    </div>

    <div className="NewsHeader__Desc">
      <Text length={100} />
    </div>
  </div>
)


export default NewsHeader
