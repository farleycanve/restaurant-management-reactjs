import type { Theme } from '@material-ui/core';
import { Box, Divider, Drawer, Typography } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import NavSection from 'components/NavSection';
import Scrollbar from 'components/Scrollbar';
import { menus } from 'menu';
import PropTypes from 'prop-types';
import type { FC } from 'react';
import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

interface DashboardSidebarProps {
	onMobileClose: () => void;
	openMobile: boolean;
}

const DashboardSidebar: FC<DashboardSidebarProps> = props => {
	const { onMobileClose, openMobile } = props;
	const location = useLocation();
	const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
	// const auth = useSelector(authSelector);

	useEffect(() => {
		if (openMobile && onMobileClose) {
			onMobileClose();
		}
	}, [location.pathname]);

	const content = (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				height: '100%',
			}}
		>
			<Scrollbar options={{ suppressScrollX: true }}>
				<Box
					sx={{
						display: {
							lg: 'none',
							xs: 'flex',
						},
						justifyContent: 'center',
						p: 2,
					}}
				>
					<RouterLink
						to="/"
						style={{
							textDecoration: 'none',
						}}
					>
						<Box
							sx={{
								height: 40,
								'& > img': {
									height: '100%',
									width: 'auto',
								},
							}}
						>
							<Typography variant="h4" color="textPrimary">
								Interview
							</Typography>
						</Box>
					</RouterLink>
				</Box>

				<Divider />
				<Box sx={{ p: 2 }}>
					{menus.map(section => (
						<NavSection
							key={section.title}
							pathname={location.pathname}
							sx={{
								'& + &': {
									mt: 3,
								},
							}}
							{...section}
						/>
					))}
				</Box>
				<Divider />
			</Scrollbar>
		</Box>
	);

	if (lgUp) {
		return (
			<Drawer
				anchor="left"
				open
				PaperProps={{
					sx: {
						backgroundColor: 'background.paper',
						height: 'calc(100% - 64px) !important',
						top: '64px !Important',
						width: 280,
					},
				}}
				variant="permanent"
			>
				{content}
			</Drawer>
		);
	}

	return (
		<Drawer
			anchor="left"
			onClose={onMobileClose}
			open={openMobile}
			PaperProps={{
				sx: {
					backgroundColor: 'background.paper',
					width: 280,
				},
			}}
			variant="temporary"
		>
			{content}
		</Drawer>
	);
};

DashboardSidebar.propTypes = {
	onMobileClose: PropTypes.func,
	openMobile: PropTypes.bool,
};

export default DashboardSidebar;
