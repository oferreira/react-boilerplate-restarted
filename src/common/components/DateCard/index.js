import React from 'react'
import PropTypes from 'prop-types'
import './styles.scss'

const DateCard = ({
  date,
}) => (
  <div className="DateCard">
    {date}
  </div>
)

DateCard.propTypes = {
  date: PropTypes.string,
}

DateCard.defaultProps = {
  date: '17.01.2017',
}

export default DateCard
