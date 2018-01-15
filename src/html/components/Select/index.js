import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import InjectDrupalMenu from 'drupal/hoc/InjectDrupalMenu'
import MenuList from 'html/components/MenuList'
import OptionList from 'html/components/OptionList'
import './styles.scss'

const Select = ({
  items,
  renderList,
  renderItem,
}) => {
  const ListToRender = renderList
  const ItemToRender = (typeof renderItem !== 'undefined' ? renderItem : OptionList)

  const content = Object.keys(items).map((id) => {
    const item = items[id]

    let below = null
    if (typeof item.below !== 'undefined') {
      below = <ListToRender items={item.below} />
    }

    return (
      <ItemToRender key={item.uri} item={item}>
        {below}
      </ItemToRender>
    )
  })

  return (
    <div className="Select__Wrapper">
      <span className="Select__Wrapper__Icon"><i className="icon icon-arrow-bot"></i></span>
      <select className="select">
        {content}
      </select>
    </div>
  )}

Select.propTypes = {
  items: PropTypes.object,
  renderList: PropTypes.func,
  renderItem: PropTypes.func,
}

Select.defaultProps = {
  items: {},
}

export default compose(
  InjectDrupalMenu,
)(Select)
