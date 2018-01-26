import React from 'react'
import Icon from 'common/components/Icon'
import './styles.scss'

const ViewMiles = () => {

  return (
    <div className="ViewMiles">
      <div className="ViewMiles__Title">View Miles by brand</div>
      <div className="ViewMiles__Desc">Earn miles for your stay with participating travel partners when you present your travel partner membership number at check-in</div>
      <div className="ViewMiles__Select__Wrapper">
        <span className="ViewMiles__Select__Wrapper__Icon">
          <Icon name="arrow-bot" />
        </span>
        <select
          className="select"
        >
          <option>American airlines - AA advantages</option>
          <option>AA</option>
          <option>AA</option>
          <option>AA</option>
        </select>
      </div>
    </div>
  )
}

export default ViewMiles
