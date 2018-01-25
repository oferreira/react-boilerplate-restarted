import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import InjectDrupalNodes from 'drupal/hoc/InjectDrupalNodes'
import Node from 'drupal/components/Node'

const Nodes = (props) => {
  const NodeToRender = (typeof props.renderNode !== 'undefined' ? props.renderNode : Node)

  return (
    <div className="Nodes">
      {props.items.map((x) => (
        <NodeToRender
          key={x.title}
          items={x}
        />
      ))}
    </div>
  )
}

Nodes.propTypes = {
  ...InjectDrupalNodes.propTypes,
  renderNode: PropTypes.func,
}

Nodes.defaultProps = {}

export default compose(
  InjectDrupalNodes,
)(Nodes)
