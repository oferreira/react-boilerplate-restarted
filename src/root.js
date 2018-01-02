import React from 'react'
import PropTypes from 'prop-types'
import { renderRoutes } from 'react-router-config'

export class Root extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { route } = this.props
    return (
      <div>{renderRoutes(route.routes)}</div>
    )
  }
}

Root.propTypes = {
  route: PropTypes.object.isRequired,
}
Root.defaultProps = {}

export default Root
