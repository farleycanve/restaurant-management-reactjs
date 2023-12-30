import { AppBar, AppBarProps, Box, IconButton, Toolbar, Typography } from '@material-ui/core';
import { experimentalStyled } from '@material-ui/core/styles';
import MenuIcon from 'assets/icons/Menu';
import AccountPopover from 'layout/components/AccountPopover';
import PropTypes from 'prop-types';
import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface DashboardNavbarProps extends AppBarProps {
	onSidebarMobileOpen?: () => void;
}

const DashboardNavbarRoot = experimentalStyled(AppBar)(({ theme }) => ({
	...(theme.palette.mode === 'light' && {
		backgroundColor: theme.palette.primary.main,
		boxShadow: 'none',
		color: theme.palette.primary.contrastText,
	}),
	...(theme.palette.mode === 'dark' && {
		backgroundColor: theme.palette.background.paper,
		borderBottom: `1px solid ${theme.palette.divider}`,
		boxShadow: 'none',
	}),
	zIndex: theme.zIndex.drawer + 100,
}));

const DashboardNavbar: FC<DashboardNavbarProps> = props => {
	const { onSidebarMobileOpen, ...other } = props;

	return (
		<DashboardNavbarRoot {...other}>
			<Toolbar sx={{ minHeight: 64 }}>
				<IconButton
					color="inherit"
					onClick={onSidebarMobileOpen}
					sx={{
						display: {
							lg: 'none',
						},
					}}
				>
					<MenuIcon fontSize="small" />
				</IconButton>
				<RouterLink
					to="/"
					style={{
						textDecoration: 'none',
					}}
				>
					<Box
						sx={{
							display: {
								lg: 'inline-block',
								xs: 'none',
							},
							width: 40,
							height: 40,
							'& > img': {
								height: '100%',
								width: 'auto',
							},
						}}
					>
						<Typography variant="h4" color="white" whiteSpace="nowrap">
							Interview
						</Typography>
					</Box>
				</RouterLink>
				<Box
					sx={{
						flexGrow: 1,
						ml: 2,
					}}
				/>
				<Box sx={{ ml: 2 }}>
					<AccountPopover />
				</Box>
			</Toolbar>
		</DashboardNavbarRoot>
	);
};

DashboardNavbar.propTypes = {
	onSidebarMobileOpen: PropTypes.func,
};

export default DashboardNavbar;
