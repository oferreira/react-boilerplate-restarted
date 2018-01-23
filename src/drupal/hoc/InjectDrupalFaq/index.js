import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import requestFaq from 'drupal/actions/requestFaq'
import { makeSelectFaq } from 'drupal/selectors'
import { injectDrupalReducer } from 'drupal/reducers'
import { injectDrupalFetchFaqWatcher } from 'drupal/sagas/fetchFaq'

/**
 * Dynamically inject the informations of a menu
 */
export default (WrappedComponent) => {
  class InjectDrupalFaq extends React.Component {
    static WrappedComponent = WrappedComponent

    static propTypes = {
      faq: PropTypes.object,
      onRequestFaq: PropTypes.func,
    }

    static displayName = `injectDrupalFaq(${(WrappedComponent.displayName || WrappedComponent.name || 'Component')})`

    componentWillMount() {
      this.props.onRequestFaq()
    }

    componentWillReceiveProps() {
      this.props.onRequestFaq()
    }

    render() {
      if (!this.props.faq) return null
      return (
        <WrappedComponent
          {...this.props}
          items={this.props.faq}
        />
      )
    }
  }

  const mapStateToProps = createStructuredSelector({
    faq: makeSelectFaq(),
  })

  const mapDispatchToProps = (dispatch) => ({
    onRequestFaq: () => dispatch(requestFaq()),
  })

  const withConnect = connect(mapStateToProps, mapDispatchToProps)
  const withReducer = injectDrupalReducer()
  const withSaga = injectDrupalFetchFaqWatcher()

  return compose(
    withReducer,
    withSaga,
    withConnect,
  )(InjectDrupalFaq)
}
