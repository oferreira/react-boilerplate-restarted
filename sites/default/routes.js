import AppRoot from 'core/Root'
import HomePage from 'pages/HomePage/Loadable'
import OffersPage from 'pages/OffersPage/Loadable'
import PartnerPage from 'pages/PartnerPage/Loadable'

const routes = [
  {
    component: AppRoot,
    routes: [
      {
        name: 'home',
        path: '/',
        exact: true,
        component: HomePage,
      },
      {
        name: 'home',
        path: '/offers',
        component: OffersPage,
      },
      {
        name: 'Our Partner',
        path: '/partner',
        component: PartnerPage,
      },
    ],
  },
]

export default routes
