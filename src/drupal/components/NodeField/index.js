import React from 'react'
import PropTypes from 'prop-types'

const NodeField = ({
  children,
  name,
  node,
}) => (
  <div>
    {node[name] || null}
    {children}
  </div>
)

NodeField.propTypes = {
  children: PropTypes.string.isRequired,
  name: PropTypes.string,
  node: PropTypes.object,
}

NodeField.defaultProps = {
  node: {},
}

export default NodeField
