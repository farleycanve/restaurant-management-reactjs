import { Box, CircularProgress } from '@material-ui/core';
import { experimentalStyled } from '@material-ui/core/styles';
import useMounted from 'hooks/useMounted';
import type { FC, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { actions as restaurantActions } from 'slices/restaurant';

import { useDispatch } from 'store';
import DashboardNavbar from './Navbar';
import DashboardSidebar from './Sidebar';
import { restaurantAPI } from 'api';

interface LayoutProps {
	children?: ReactNode;
}

const LayoutRoot = experimentalStyled('div')(({ theme }) => ({
	backgroundColor: theme.palette.background.default,
	display: 'flex',
	height: '100%',
	overflow: 'hidden',
	width: '100%',
}));

const LayoutWrapper = experimentalStyled('div')(({ theme }) => ({
	display: 'flex',
	flex: '1 1 auto',
	overflow: 'hidden',
	paddingTop: '64px',
	[theme.breakpoints.up('lg')]: {
		paddingLeft: '280px',
	},
}));

const LayoutContainer = experimentalStyled('div')({
	display: 'flex',
	flex: '1 1 auto',
	overflow: 'hidden',
});

const LayoutContent = experimentalStyled('div')({
	flex: '1 1 auto',
	height: '100%',
	overflow: 'auto',
	position: 'relative',
	WebkitOverflowScrolling: 'touch',
});

const Layout: FC<LayoutProps> = () => {
	const [isSidebarMobileOpen, setIsSidebarMobileOpen] = useState<boolean>(false);
	const mounted = useMounted();
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function initAppData() {
			try {
				const response: any = await restaurantAPI.getAll();

				if (mounted.current) {
					dispatch(restaurantActions.list(response));

					setIsLoading(false);
				}
			} catch (error) {
				console.log('The following error occurred:', error.message);
				setIsLoading(false);
			}
		}
		initAppData();
	}, []);

	return (
		<LayoutRoot>
			{isLoading ? (
				<Box
					sx={{
						width: '100%',
						height: '100vh',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
					style={{ textAlign: 'center' }}
				>
					<CircularProgress />
				</Box>
			) : (
				<>
					<DashboardNavbar onSidebarMobileOpen={(): void => setIsSidebarMobileOpen(true)} />
					<DashboardSidebar
						onMobileClose={(): void => setIsSidebarMobileOpen(false)}
						openMobile={isSidebarMobileOpen}
					/>
					<LayoutWrapper>
						<LayoutContainer>
							<LayoutContent>
								<Outlet />
							</LayoutContent>
						</LayoutContainer>
					</LayoutWrapper>
				</>
			)}
		</LayoutRoot>
	);
};

export default Layout;
