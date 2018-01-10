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

// Import i18n messages
import translationMessages from 'core/language/utils/translationMessages'
import 'scss/_global.scss'

export const MOUNT_NODE = document.getElementById('app')

export default (routes = [], initialState = {}) => {
  // Create redux store with history
  const history = createHistory()
  const store = configureStore(initialState, history)

  const render = (messages) => {
    ReactDOM.render(
      <Provider store={store}>
        <LanguageProvider messages={messages}>
          <ConnectedRouter history={history}>
            <Switch>{renderRoutes(routes)}</Switch>
          </ConnectedRouter>
        </LanguageProvider>
      </Provider>,
      MOUNT_NODE
    )
  }

  if (module.hot) {
    // Hot reloadable React components and translation json files
    // modules.hot.accept does not accept dynamic dependencies,
    // have to be constants at compile-time
    module.hot.accept(['core/language/utils/translationMessages'], () => {
      ReactDOM.unmountComponentAtNode(MOUNT_NODE)
      render(translationMessages)
    })
  }

  // Chunked polyfill for browsers without Intl support
  if (!window.Intl) {
    (new Promise((resolve) => {
      resolve(import('intl'))
    }))
      .then(() => Promise.all([
        import('intl/locale-data/jsonp/en.js'),
      ]))
      .then(() => render(translationMessages))
      .catch((err) => {
        throw err
      })
  } else {
    render(translationMessages)
  }

  if (process.env.NODE_ENV === 'production') require('offline-plugin/runtime').install()
}
