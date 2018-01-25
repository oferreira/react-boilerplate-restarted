import AppRoot from 'core/Root'
import SearchPage from 'pages/SearchPage/Loadable'
import RoomsPage from 'pages/RoomsPage/Loadable'
import ErrorPage from 'pages/ErrorPage/Loadable'

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
        name: 'room',
        path: '/rooms/:id',
        component: RoomsPage,
      },
      {
        path: '*',
        name: 'notfound',
        component: ErrorPage,
      },
    ],
  },
]

export default routes
