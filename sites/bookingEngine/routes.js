import AppRoot from 'core/Root'
import SearchPage from 'pages/SearchPage/Loadable'

const routes = [
  {
    component: AppRoot,
    routes: [
      {
        name: 'search',
        path: '/search',
        component: SearchPage,
      },
    ],
  },
]

export default routes
