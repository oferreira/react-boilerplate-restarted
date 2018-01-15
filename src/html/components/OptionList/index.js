import React from 'react'
import PropTypes from 'prop-types'

const OptionList = ({
  item
}) => (
  <option
    value= {item.title}
  >
    {item.title}
  </option>
)

OptionList.propTypes = {
  item: PropTypes.object,
}

OptionList.defaultProps = {
  item: {},
}

export default OptionList
