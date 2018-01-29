import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'common/components/Icon'
import classNames from 'classnames'
import InjectDrupalNodes from 'drupal/hoc/InjectDrupalNodes'
import './styles.scss'

const SelectBox = ({
  items,
  blueSelect,
}) => {
  const selectClasses = classNames('Select', {
    'Select--Blue': blueSelect,
  })

  const content = items.map((item, ind) => (
    <option
      key={item.title + ind}
      value={item.title}
    >
      {item.title}
    </option>
  ))

  return (
    <div className="Select__Wrapper">
      <span className="Select__Wrapper__Icon">
        <Icon name="arrow-bot" />
      </span>
      <select
        className={selectClasses}
      >
        {content}
      </select>
    </div>
  )
}

SelectBox.propTypes = {
  items: PropTypes.array,
  blueSelect: PropTypes.bool,
}

export default InjectDrupalNodes(SelectBox)
