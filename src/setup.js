// Needed for redux-saga es6 generator support
import 'babel-polyfill'

// Import all the third party stuff
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Switch } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import createHistory from 'history/createBrowserHistory'

// Import Language Provider
import LanguageProvider from 'core/language/containers/LanguageProvider'

// Import store configurator
import configureStore from 'core/store/configureStore'

import 'scss/_global.scss'

export const MOUNT_NODE = document.getElementById('app')

export default (routes = [], initialState = {}) => {
  // Create redux store with history
  const history = createHistory()
  const store = configureStore(initialState, history)

  const render = () => {
    ReactDOM.render(
      <Provider store={store}>
        <LanguageProvider>
          <ConnectedRouter history={history}>
            <Switch>{renderRoutes(routes)}</Switch>
          </ConnectedRouter>
        </LanguageProvider>
      </Provider>,
      MOUNT_NODE
    )
  }

  render()
}
