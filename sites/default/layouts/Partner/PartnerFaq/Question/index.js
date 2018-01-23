import React from 'react'
import PropTypes from 'prop-types'
import Text from 'common/PlaceHolders/Text'

import '../styles.scss'

const Question = ({
  isExpanded,
}) => (
  <div className="Question">
    <div><Text length={100} /></div>
    <div className="Question__Circle__Container">
      {isExpanded ?
        <div className="Question__Circle__Expanded">
          <span>-</span>
        </div>
        :
        <div className="Question__Circle__Collapsed">
          <span>+</span>
        </div>
      }
    </div>
  </div>
)

Question.propTypes = {
  isExpanded: PropTypes.bool,
}

Question.defaultProps = {
  isExpanded: false,
}

export default Question
