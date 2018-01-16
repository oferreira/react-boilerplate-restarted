/**
*
* Expand
*
*/
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'components/Icon'
import { Toggle, Small } from 'components/Expand'

require('./styles.scss')

const FilterExpand = ({
  type,
  title,
  children,
  add,
  update,
  remove,
  ...props
}) => (
  <div className="Filter__Expand">
    <Toggle
      name={type}
      opened={
        <button className="Filter__Expand-btn">
          <span className="Filter__Expand__Title">{title}</span>
          <Icon name="arrow-top" />
        </button>
      }
      closed={
        <button className="Filter__Expand-btn">
          <span className="Filter__Expand__Title">{title}</span>
          <Icon name="arrow-bot" />
        </button>
      }
    />
    <Small name={type} startOpened>
      {React.Children.map(children, (child) => React.cloneElement(child, {
        add,
        update,
        remove,
        ...props,
      }))}
    </Small>
  </div>
)

FilterExpand.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  add: PropTypes.func,
  remove: PropTypes.func,
  update: PropTypes.func,
}

FilterExpand.defaultProps = {}

export default FilterExpand
