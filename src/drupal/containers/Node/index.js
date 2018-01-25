/*
 *
 * Node
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import { injectDrupalReducer } from 'drupal/reducers'
import { injectDrupalFetchNodeWatcher } from 'drupal/sagas/fetchNode'
import requestNode from 'drupal/actions/requestNode'
import { makeSelectNodes } from 'drupal/selectors'
import { findByIdFilter } from 'core/filters'
import NodeField from 'drupal/components/NodeField'

export class Node extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static defaultProps = {
    fields: [
      'title',
      'body',
    ],
  }

  componentWillMount() {
    this.props.requestNode(this.props.id)
  }

  render() {
    const item = this.props.nodes.find(findByIdFilter(this.props.id))

    if (!item) return null

    return (
      <div>
        <Helmet>
          <title>{item.title}</title>
          <meta name="description" content="" />
        </Helmet>
        {this.props.fields.map((name) => <NodeField key={name} name={name} value={item[name]} />)}
      </div>
    )
  }
}

Node.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  requestNode: PropTypes.func,
  fields: PropTypes.array,
  nodes: PropTypes.object,
}

const mapStateToProps = createStructuredSelector({
  nodes: makeSelectNodes(),
})

const mapDispatchToProps = (dispatch) => ({
  requestNode: (id) => dispatch(requestNode(id)),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
const withReducer = injectDrupalReducer()
const withSaga = injectDrupalFetchNodeWatcher()

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Node)
