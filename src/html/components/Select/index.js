import React from 'react'
import PropTypes from 'prop-types'
import './styles.scss'

const Select = ({
  items,
}) => {
  const content = Object.keys(items).map((id) => {
    const {
      key,
      value,
    } = items[id]

    return (
      <option key={key}>{value}</option>
    )
  })

  return (
    <div className="Select__Wrapper">
      <span className="Select__Wrapper__Icon"><i className="icon icon-arrow-bot"></i></span>
      <select className="select">
        {content}
      </select>
    </div>
  )
}

Select.propTypes = {
  items: PropTypes.array,
}

Select.defaultProps = {
  items: {},
}

export default Select
