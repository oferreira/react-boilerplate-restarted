import AppRoot from 'core/Root'
import HomePage from 'pages/HomePage/Loadable'
import OffersPage from 'pages/OffersPage/Loadable'
import PartnerPage from 'pages/PartnerPage/Loadable'

import BrandsPage from 'pages/BrandsPage/Loadable'
import BrandPage from 'pages/BrandPage/Loadable'

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
        name: 'Brands',
        path: '/brands',
        component: BrandsPage,
      },
      {
        name: 'Brand',
        path: '/brand',
        component: BrandPage,
      },
    ],
  },
]

export default routes
