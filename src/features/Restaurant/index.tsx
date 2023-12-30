import { Box, Breadcrumbs, Container, Grid, Link, Typography } from '@material-ui/core';
import ChevronRightIcon from 'assets/icons/ChevronRight';
import gtm from 'lib/gtm';
import { FC, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import { listRestaurants } from 'slices/restaurant';
import { useDispatch, useSelector } from 'store';
import { settingSelector, restaurantSelector } from 'utils/selectors';
import RestaurantList from './components/RestaurantList';
const Restaurant: FC = () => {
	const settings = useSelector(settingSelector);

	const restaurant = useSelector(restaurantSelector);
	const dispatch = useDispatch();

	useEffect(() => {
		gtm.push({ event: 'page_view' });
	}, []);

	// useEffect(() => {
	// 	const getInitRestaurant = async () => {
	// 		try {
	// 			await dispatch(listRestaurants());
	// 		} catch (error) {
	// 			console.dir(error);
	// 		}
	// 	};
	// 	getInitRestaurant();
	// }, []);

	return (
		<>
			<Helmet>
				<title>Restaurant Management</title>
			</Helmet>
			<Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 2 }}>
				<Container maxWidth={settings.compact ? 'xl' : false}>
					<Grid container justifyContent="space-between" spacing={3}>
						<Grid item>
							<Typography color="textPrimary" variant="h5">
								Restaurant List
							</Typography>
							<Breadcrumbs aria-label="breadcrumb" separator={<ChevronRightIcon fontSize="small" />} sx={{ mt: 1 }}>
								<Link color="textPrimary" component={RouterLink} to="/" variant="subtitle2">
									Dashboard
								</Link>

								<Typography color="textSecondary" variant="subtitle2">
									Restaurants
								</Typography>
							</Breadcrumbs>
						</Grid>
					</Grid>

					<Box sx={{ mt: 3 }}>
						<RestaurantList doc={restaurant.restaurants} />
					</Box>
				</Container>
			</Box>
		</>
	);
};

export default Restaurant;
