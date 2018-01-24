import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import requestNodes from 'drupal/actions/requestNodes'
import { findByIdFilter } from 'core/filters'
import { makeSelectNodes } from 'drupal/selectors'
import { injectDrupalReducer } from 'drupal/reducers'
import { injectDrupalfetchNodesWatcher } from 'drupal/sagas/fetchNodes'

/**
 * Dynamically inject the informations of a node list
 */
export default (WrappedComponent) => {
  class InjectDrupalNodes extends React.Component {
    static WrappedComponent = WrappedComponent

    static propTypes = {
      id: PropTypes.string.isRequired,
      sort: PropTypes.string,
      limit: PropTypes.number,
      nodes: PropTypes.object,
      onRequestNodes: PropTypes.func,
    }

    static defaultProps = {
      sort: 'DESC',
      limit: 999,
    }

    static displayName = `InjectDrupalNodes(${(WrappedComponent.displayName || WrappedComponent.name || 'Component')})`

    componentWillMount() {
      this.props.onRequestNodes(this.props.id, this.props.sort, this.props.limit)
    }

    componentWillReceiveProps(props) {
      if (props.id !== this.props.id) {
        this.props.onRequestNodes(this.props.id, this.props.sort, this.props.limit)
      }
    }

    render() {
      const items = this.props.nodes.find(findByIdFilter(this.props.id))

      if (!items) return null

      return (
        <WrappedComponent
          {...this.props}
          items={items}
        />
      )
    }
  }

  const mapStateToProps = createStructuredSelector({
    nodes: makeSelectNodes(),
  })

  const mapDispatchToProps = (dispatch) => ({
    onRequestNodes: (node, sort, limit) => dispatch(requestNodes(node, sort, limit)),
  })

  const withConnect = connect(mapStateToProps, mapDispatchToProps)
  const withReducer = injectDrupalReducer()
  const withSaga = injectDrupalfetchNodesWatcher()

  return compose(
    withReducer,
    withSaga,
    withConnect,
  )(InjectDrupalNodes)
}
