import { Suspense, lazy } from 'react';
import type { PartialRouteObject } from 'react-router';
import { Navigate } from 'react-router-dom';
import AuthGuard from './layout/AuthGuard';
import Layout from './layout/Layout';
import GuestGuard from './layout/GuestGuard';
import LoadingScreen from './components/LoadingScreen';

const Loadable = Component => props =>
	(
		<Suspense fallback={<LoadingScreen />}>
			<Component {...props} />
		</Suspense>
	);

// Authentication pages

const Login = Loadable(lazy(() => import('./features/Authentication/Login/Login')));

const Restaurant = Loadable(lazy(() => import('features/Restaurant')));

// Error pages

const AuthorizationRequired = Loadable(lazy(() => import('pages/AuthorizationRequired')));
const NotFound = Loadable(lazy(() => import('pages/NotFound')));
const ServerError = Loadable(lazy(() => import('pages/ServerError')));

const routes: PartialRouteObject[] = [
	{
		path: 'authentication',
		children: [
			{
				path: '/',
				element: <Navigate to="/login" replace />,
			},
			{
				path: 'login',
				element: (
					<GuestGuard>
						<Login />
					</GuestGuard>
				),
			},
		],
	},
	{
		path: '*',
		element: (
			<AuthGuard>
				<Layout />
			</AuthGuard>
		),
		children: [
			{
				path: '/',
				element: <Navigate to="/restaurants" />,
			},
			{ path: 'restaurants', element: <Restaurant /> },

			{
				path: '*',
				children: [
					{
						path: '401',
						element: <AuthorizationRequired />,
					},
					{
						path: '404',
						element: <NotFound />,
					},
					{
						path: '500',
						element: <ServerError />,
					},
					{
						path: '*',
						element: <NotFound />,
					},
				],
			},
		],
	},
];

export default routes;
