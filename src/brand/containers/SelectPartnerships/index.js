import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import { makeSelectPartnerships } from 'brand/selectors'
import CardLayout from 'brand/components/CardLayout'

const SelectPartnerships = ({
  partnerships,
}) => {
  const items = Object.keys(partnerships).map((key) => ({
    key,
    value: partnerships[key],
  }))

  return (
    <div className="Selectpartnerships">
      <CardLayout partnerships={items} />
    </div>
  )
}

SelectPartnerships.propTypes = {
  partnerships: PropTypes.object,
}

const mapStateToProps = createStructuredSelector({
  partnerships: makeSelectPartnerships(),
})


const withConnect = connect(mapStateToProps)

export default compose(
  withConnect,
)(SelectPartnerships)
