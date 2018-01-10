import React from 'react'
import PropTypes from 'prop-types'

const NodeField = ({
  name,
  node,
}) => (
  <div>
    {node[name] || null}
  </div>
)

NodeField.propTypes = {
  name: PropTypes.string,
  node: PropTypes.object,
}

NodeField.defaultProps = {
  node: {},
}

export default NodeField
