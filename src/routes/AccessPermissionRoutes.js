import React, { lazy } from 'react';
import { PATH_ACCESS_PERMISSION } from './paths';
import DashboardLayout from '~/layouts/DashboardLayout';
import GuestProtect from '~/components/Auth/GuestProtect';

// ----------------------------------------------------------------------

const AccessPermissionRoutes = {
	path: PATH_ACCESS_PERMISSION.root,
	guard: GuestProtect,
	layout: DashboardLayout,
	routes: [
		// MAIN DASHBOARD
		// ----------------------------------------------------------------------
		{
			exact: true,
			path: PATH_ACCESS_PERMISSION.outgoing.root,
			component: lazy(() =>
				import('~/views/access-permission/OutgoingRequestView'),
			),
		},
	],
};

export default AccessPermissionRoutes;
