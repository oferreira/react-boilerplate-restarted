import React from 'react'
import PropTypes from 'prop-types'
import MenuItem from 'html/components/MenuItem'

const MenuList = ({
  items,
  renderList,
  renderItem,
}) => {
  const ListToRender = renderList
  const ItemToRender = (typeof renderItem !== 'undefined' ? renderItem : MenuItem)

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
    <ul className="MenuList">
      {content}
    </ul>
  )
}

MenuList.propTypes = {
  items: PropTypes.object,
  renderList: PropTypes.func,
  renderItem: PropTypes.func,
}

MenuList.defaultProps = {
  items: {},
}

export default MenuList
