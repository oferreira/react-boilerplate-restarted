import AppRoot from 'core/Root'
import SearchPage from 'pages/SearchPage/Loadable'
import ResultsPage from 'pages/ResultsPage/Loadable'

const routes = [
  {
    component: AppRoot,
    routes: [
      {
        name: 'search',
        path: '/search',
        component: SearchPage,
      },
      {
        name: 'results',
        path: '/results',
        component: ResultsPage,
      },
    ],
  },
]

export default routes
