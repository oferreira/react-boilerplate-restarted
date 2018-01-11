/**
*
* Chip
*
*/
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PropTypes } from 'react'
import InputRange from 'react-input-range'
import { getMin, getMax, getObjectValue } from 'utils/functions'
import { createRangeFilter } from 'containers/Filter/selectors'
import { AND_RULE } from 'containers/Filter/constants'

require('react-input-range/lib/css/index.css')
require('./styles.scss')

class FilterRange extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: null,
      min: 0,
      max: 1,
      item: null,
    }
  }

  componentWillMount() {
    const {
      init,
      name,
      isMax,
      filterKey,
      datas,
      rule,
    } = this.props

    init(name, filterKey, rule)
    const nState = this.getMinMax(filterKey, datas)
    const tmp = {
      ...nState,
      value: nState.min !== nState.max ? {
        min: nState.min,
        max: nState.max,
      } : nState.min,
    };
    if (isMax) {
      tmp.value = nState.max
    }
    this.setState(tmp)
  }

  componentWillReceiveProps(props) {
    if (props.filteredDatas.size === this.props.datas.size) {
      const nState = this.getMinMax(props.filterKey, props.filteredDatas)
      this.setState({
        ...this.state,
        value: nState,
      })
    }
  }

  getMinMax(filterKey, datas) {
    const min = getObjectValue(getMin(datas, filterKey), filterKey.slice(1))
    const maxItem = getMax(datas, filterKey)
    const max = Math.ceil(getObjectValue(maxItem, filterKey.slice(1)))
    const nState = {
      min,
      max,
      item: maxItem,
    }
    return nState
  }
  render() {
    const {
      name,
      update,
      filterKey,
      formatLabel,
      isMax,
    } = this.props

    const {
      min,
      max,
      item,
    } = this.state

    return (
      <InputRange
        minValue={min}
        maxValue={max}
        value={this.state.value}
        formatLabel={(value) => formatLabel(item, value)}
        onChange={(value) => {
          update(name, filterKey,
            createRangeFilter(
              filterKey,
              isMax ? { min: 0, max: value } : value,
              isMax ?
                <div className="Chip__Value">
                  <span>{formatLabel(item, value)}</span>
                </div> :
                <div className="Chip__Value">
                  <span>{formatLabel(item, value.min)}</span>
                  <span>-</span>
                  <span>{formatLabel(item, value.max)}</span>
                </div>,
            )
          )
          this.setState({ value })
        }}
      />
    )
  }
}

FilterRange.propTypes = {
  /**
   * Passed by <Filter /> component to initialize the filter
   * @type func
   */
  init: PropTypes.func,
  update: PropTypes.func,
  // eslint-disable-next-line
  add: PropTypes.func,
  // eslint-disable-next-line
  remove: PropTypes.func,
  /**
   * Set to true to filter by max values only
   * @type boolean
   */
  isMax: PropTypes.bool,
  name: PropTypes.string,
  /**
   * Object keys used to filter the datas
   */
  filterKey: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
  ]),
  datas: PropTypes.object, // eslint-disable-line
  filteredDatas: PropTypes.object, // eslint-disable-line
  rule: PropTypes.string,
  // eslint-disable-next-line
  formatLabel: PropTypes.func,
}

FilterRange.defaultProps = {
  rule: AND_RULE,
  isMax: false,
}

export default FilterRange
