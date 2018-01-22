import React from 'react'
import Text from 'common/PlaceHolders/Text'
import Collapse from 'common/hoc/Collapse'
import Question from '../Question'

const Anwser = () => (
  <div className="Anwser">
    <Text length={350} />
  </div>
)

export default Collapse(() => (<Question />))(Anwser)
