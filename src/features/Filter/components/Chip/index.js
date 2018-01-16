/**
*
* Chip
*
*/
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import PropTypes from 'prop-types'
// import { connect } from 'react-redux';
import Icon from 'components/Icon/Button'
// import { removeFilter } from 'containers/Filter/actions';

require('./styles.scss')

const FilterChip = ({ icon, filter, onRemove }) => (
  <div className="Filter__Chip">
    {icon && <Icon name={icon} />}
    {filter.text}
    {onRemove && (
      <Icon onClick={() => onRemove(filter)} name="cross" />
    )}
  </div>
)

FilterChip.propTypes = {
  icon: PropTypes.string,
  // onSelect: React.PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  filter: PropTypes.object,
}

FilterChip.defaultProps = {}

export default FilterChip
