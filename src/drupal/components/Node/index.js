import React from 'react'
import PropTypes from 'prop-types'
import NodeField from 'drupal/components/NodeField'

const Node = ({
  items,
  fields,
  renderNodeField,
}) => {
  const NodeFieldToRender = (typeof renderNodeField !== 'undefined' ? renderNodeField : NodeField)

  let content

  if (fields.length) {
    content = fields.map((name) => (
      <NodeFieldToRender
        key={name}
        name={name}
        value={items[name]}
      />
    ))
  } else {
    content = Object.keys(items).map((name) => (
      <NodeFieldToRender
        key={name}
        name={name}
        value={items[name]}
      />
    ))
  }

  return (
    <div className="Node">
      {content}
    </div>
  )
}

Node.propTypes = {
  items: PropTypes.object,
  fields: PropTypes.array,
  renderNodeField: PropTypes.func,
}

Node.defaultProps = {
  items: {},
  fields: [],
}

export default Node
