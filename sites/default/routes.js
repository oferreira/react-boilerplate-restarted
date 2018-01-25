import AppRoot from 'core/Root'
import HomePage from 'pages/HomePage/Loadable'
import OffersPage from 'pages/OffersPage/Loadable'
import PartnerPage from 'pages/PartnerPage/Loadable'
import PartnershipsPage from 'pages/PartnershipsPage/Loadable'

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
      {
        name: 'Partnerships',
        path: '/partnerships',
        component: PartnershipsPage,
      },
    ],
  },
]

export default routes
