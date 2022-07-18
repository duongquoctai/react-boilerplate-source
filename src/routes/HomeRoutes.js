import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import HomeLayout from '~/layouts/HomeLayout';

// ----------------------------------------------------------------------

const HomeRoutes = {
  path: '*',
  layout: HomeLayout,
  routes: [
    {
      exact: true,
      path: '/',
      component: () => <Redirect to="/app/dashboard" />
    },
    {
      exact: true,
      path: '/components',
      component: lazy(() => import('~/views/home/ComponentsView'))
    },
    {
      component: () => <Redirect to="/404" />
    }
  ]
};

export default HomeRoutes;
