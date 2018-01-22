import React from 'react'
import Text from 'common/PlaceHolders/Text'
import Collapse from 'common/hoc/Collapse'
import Question from '../Question'

import '../styles.scss'

const Answer = () => (
  <div className="Answer">
    <Text length={350} />
  </div>
)

export default Collapse(() => (<Question />))(Answer)
