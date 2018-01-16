/**
*
* Filter
*
*/
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
// import FormattedMessage from 'components/FormattedMessage'
import { Desktop } from 'utils/breakpoint'
import Icon from 'components/Icon'
import { EXPAND_SIDEPANEL } from 'components/Expand/constants'
import { close } from 'components/Expand/actions'

import Chip from './components/Chip'
import { addFilter, updateFilter, removeFilter, resetFilter, toggleFilter, initFilter } from './actions'
import messages from './messages'
require('./styles.scss')

class Filter extends React.Component {
  componentWillMount() {
    if (!this.isFiltersEmpty(this.props.filters)) {
      this.props.reset(this.props.name)
    }
  }

  isFiltersEmpty = (filters) => {
    if (!filters) return true
    if (filters.size) {
      return !filters.reduce((acc, filter) => filter.get('filters').length + acc, 0)
    }
    return true
  }

  render() {
    const {
      children,
      filters,
      add,
      toggle,
      update,
      remove,
      reset,
      name,
      init,
      filteredDatas,
      datas,
      closeExpand,
      ...props
    } = this.props

    return (
      <div className="Filter" {...props}>
        <Desktop>
          <div className="Filter__closeWrapper">
            <button onClick={() => closeExpand(EXPAND_SIDEPANEL)}>
              <Icon name="cross Filter__closeIcon" />
            </button>
          </div>
        </Desktop>

        {!this.isFiltersEmpty(filters) &&
        <div className="Filter__Chips">
          {filters.map((filter) => filter.get('filters').map(((f) => <Chip key={f.name} onRemove={() => remove(name, f.key, f)} filter={f} />)))}
        </div>}
        {!this.isFiltersEmpty(filters) && <button className="Filter__Reset" onClick={() => reset(name)}><FormattedMessage {...messages.resetFilters} /></button>}
        {datas && React.Children.map(
          children,
          (child) => React.cloneElement(child, {
            name,
            add,
            init,
            update,
            remove,
            toggle,
            filteredDatas,
            datas,
            ...props,
          }))}
      </div>
    )
  }
}


Filter.propTypes = {
  children: PropTypes.node,
  /**
   * Unique identifier for namespacing filters
   * @type string
   * @required
   */
  name: PropTypes.string,
  add: PropTypes.func,
  /**
   * Init the filters state
   * @required
   */
  init: PropTypes.func,
  remove: PropTypes.func,
  update: PropTypes.func,
  reset: PropTypes.func,
  toggle: PropTypes.func,
  closeExpand: PropTypes.func,
  /**
   * Unfiltered datas
   * Must be an iterable object (Array, List, Map ...)
   * @required
   */
  datas: PropTypes.object,
  /**
   * filtered datas
   * Must be an iterable object (Array, List, Map ...)
   * @required
   */
  filteredDatas: PropTypes.object,
  /**
   * Iterable list of filters
   * Must be an immutablejs object
   */
  filters: PropTypes.object,
}

Filter.defaultProps = {

}

const mapStateToProps = () => ({})
const mapDispatchToProps = (dispatch) => ({
  init: (name, key, rule) => dispatch(initFilter(name, key, rule)),
  reset: (name, filter) => dispatch(resetFilter(name, filter)),
  add: (name, key, filter) => dispatch(addFilter(name, key, filter)),
  update: (name, key, filter) => dispatch(updateFilter(name, key, filter)),
  remove: (name, key, filter) => dispatch(removeFilter(name, key, filter)),
  toggle: (name, key, filter) => dispatch(toggleFilter(name, key, filter)),
  closeExpand: (name) => dispatch(close(name)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
