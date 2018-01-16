/**
*
* Chip
*
*/
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PropTypes } from 'react'
import CheckBox from 'components/Input/CheckBox'
import { createMatchFilter, countMatchedOccurences } from 'features/Filter/selectors'

require('./styles.scss')

class FilterToggle extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      values: [],
      item: null,
    }
  }

  componentWillMount() {
    const filteredKeys = {}
    const { filterKey } = this.props
    this.props.datas.forEach((item) => {
      if (!Array.isArray(item[filterKey])) {
        // eslint-disable-next-line
        filteredKeys[item[filterKey]] = true;
      } else {
        item[filterKey].forEach((key) => {
          filteredKeys[key] = true
        })
      }
    })

    this.props.init(
      this.props.name,
      this.props.filterKey,
      this.props.rule,
    )

    this.setState({
      values: Object.keys(filteredKeys).filter((key) => key !== 'null'),
      item: this.props.datas.pop(),
    })
  }
  renderCheckBox = (value) => {
    const {
      name,
      toggle,
      filterKey,
      filters,
      formatLabel,
      filteredDatas,
    } = this.props

    const currentFilters = filters.getIn(Array.isArray(filterKey) ? filterKey : [filterKey])
    const toggleFilters = currentFilters ? currentFilters.get('filters') : []
    const { item } = this.state
    const matches = countMatchedOccurences(filteredDatas, filterKey, value)

    return (
      <CheckBox
        key={`checkBoxFilter${value}`}
        id={`checkBoxFilter${value}`}
        input={{
          value,
          checked: !!toggleFilters.find((filter) => (filter.value === value)),
          onChange: () => {
            toggle(
              name,
              filterKey,
              createMatchFilter(
                filterKey,
                value,
                formatLabel ? formatLabel(item, value) : value,
                value,
              )
            )
          },
        }}
        label={formatLabel ? formatLabel(item, value, matches ? matches.size : null) : value}
      />
    )
  }
  render() {
    const { className } = this.props
    const { values } = this.state
    return (
      <div className={className}>
        {values.map((value) => (
          Array.isArray(value) ? value.map(this.renderCheckBox) : this.renderCheckBox(value)
        ))}
      </div>
    )
  }
}

FilterToggle.propTypes = {
  name: PropTypes.string.isRequired,
  filterKey: PropTypes.string.isRequired,
  datas: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.array.isRequired,
  ]),
  toggle: PropTypes.func.isRequired,
  init: PropTypes.func.isRequired,
  formatLabel: PropTypes.func,
  filters: PropTypes.object,
  rule: PropTypes.string.isRequired,
  className: PropTypes.string,
  /**
   * filtered datas
   * Must be an iterable object (Array, List, Map ...)
   * @required
   */
  filteredDatas: PropTypes.object,
}

FilterToggle.defaultProps = {
  datas: [],
}

export default FilterToggle
