import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import InjectDrupalMenu from 'drupal/hoc/InjectDrupalMenu'
import MenuList from 'common/components/MenuList'

const Menu = (props) => {
  const ListToRender = (typeof props.renderList !== 'undefined' ? props.renderList : MenuList)
  return (
    <div className="Menu">
      <ListToRender
        {...props}
        renderList={ListToRender}
      />
    </div>
  )
}

Menu.propTypes = {
  id: PropTypes.string.isRequired,
  items: PropTypes.object,
  renderList: PropTypes.func,
  renderItem: PropTypes.func,
}

Menu.defaultProps = {
  items: {},
}

export default compose(
  InjectDrupalMenu,
)(Menu)
