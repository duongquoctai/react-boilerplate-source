import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import { PATH_APP, PATH_PAGE } from './paths';
import AuthProtect from '~/components/Auth/AuthProtect';
import DashboardLayout from '~/layouts/DashboardLayout';

// ----------------------------------------------------------------------

const AppRoutes = {
  path: PATH_APP.root,
  guard: AuthProtect,
  layout: DashboardLayout,
  routes: [
    // MAIN DASHBOARD
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_APP.main.dashboard,
      component: lazy(() => import('~/views/general/DashboardAppView'))
    }
  ]
};

export default AppRoutes;
