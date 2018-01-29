import React from 'react'
import SelectBox from 'common/components/SelectBox'
import './styles.scss'

const ViewMiles = () => (
  <div className="ViewMiles">
    <div className="ViewMiles__Title">View Miles by brand</div>
    <div className="ViewMiles__Desc">
      Earn miles for your stay with participating travel partners when you present your travel partner membership number at check-in
    </div>
    <div className="ViewMiles__Select__Wrapper">
      <SelectBox
        id="partnerships"
        limit={3}
        order="DESC"
      />
    </div>
  </div>
)

export default ViewMiles
