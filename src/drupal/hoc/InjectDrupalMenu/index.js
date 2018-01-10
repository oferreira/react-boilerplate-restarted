import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import requestMenu from 'drupal/actions/requestMenu'
import { findByIdFilter } from 'core/filters'
import { makeSelectMenus } from 'drupal/selectors'
import { injectDrupalReducer } from 'drupal/reducers'
import { injectDrupalFetchMenuWatcher } from 'drupal/sagas/fetchMenu'

/**
 * Dynamically inject the informations of a menu
 */
export default (WrappedComponent) => {
  class InjectDrupalMenu extends React.Component {
    static WrappedComponent = WrappedComponent

    static propTypes = {
      id: PropTypes.string.isRequired,
      menus: PropTypes.object,
      onRequestMenu: PropTypes.func,
    }

    static displayName = `injectDrupalMenu(${(WrappedComponent.displayName || WrappedComponent.name || 'Component')})`

    componentWillMount() {
      this.props.onRequestMenu(this.props.id)
    }

    componentWillReceiveProps(props) {
      if (props.id !== this.props.id) {
        this.props.onRequestMenu(this.props.id)
      }
    }

    render() {
      const items = this.props.menus.find(findByIdFilter(this.props.id))

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
    menus: makeSelectMenus(),
  })

  const mapDispatchToProps = (dispatch) => ({
    onRequestMenu: (id) => dispatch(requestMenu(id)),
  })

  const withConnect = connect(mapStateToProps, mapDispatchToProps)
  const withReducer = injectDrupalReducer()
  const withSaga = injectDrupalFetchMenuWatcher()

  return compose(
    withReducer,
    withSaga,
    withConnect,
  )(InjectDrupalMenu)
}
