import {
	Box,
	Card,
	CardContent,
	CardHeader,
	Divider,
	InputAdornment,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
	TextField,
} from '@material-ui/core';
import SearchIcon from 'assets/icons/Search';
import { ChangeEvent, FC, MouseEvent, useEffect, useState } from 'react';
import CreateRestaurant from './RestaurantActions/CreateRestaurant';
import DeleteRestaurant from './RestaurantActions/DeleteRestaurant';
import EditRestaurant from './RestaurantActions/EditRestaurant';
import useMounted from 'hooks/useMounted';
import { useDispatch, useSelector } from 'store';
import { listRestaurants } from 'slices/restaurant';
import FoodTypeFilter from './FoodTypeFilter';
import RatingFilter from './RatingFilter';

export const handleGetRandomColor = (index): 'primary' | 'secondary' | 'warning' | 'info' | 'success' | 'error' => {
	const colors: any[] = ['primary', 'secondary', 'warning', 'info', 'success', 'error'];

	return colors[index % (colors.length - 1)];
};

//slice import
const RestaurantList: FC<any> = props => {
	const mounted = useMounted();
	const dispatch = useDispatch();
	const { doc } = props;
	const { totalCount } = doc;
	// console.log(restaurants);
	const [totalRestaurants, setTotalRestaurants] = useState<number>(0);
	const { restaurants } = useSelector(state => state.restaurant);
	const [page, setPage] = useState<number>(0);
	const [limit, setLimit] = useState<number>(10);
	const [query, setQuery] = useState<string>();
	const [foodTypeSelected, setFoodTypeSelected] = useState<null | string>('');
	const [ratingOpeSelected, setRatingOpeSelected] = useState<null | object>();
	const paginated = restaurants;

	useEffect(() => {
		if (page + 1 > Math.floor(totalCount / limit)) {
			setPage(Math.floor(totalCount / limit));
			getRestaurantByPage(Math.floor(totalRestaurants / limit), limit, foodTypeSelected, ratingOpeSelected);
		} else {
			getRestaurantByPage(page, limit, foodTypeSelected, ratingOpeSelected);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, limit, foodTypeSelected, ratingOpeSelected]);

	const getRestaurantByPage = async (page, limit, foodTypeSelected?, ratingOpeSelected?) => {
		try {
			console.log(page, limit, foodTypeSelected, ratingOpeSelected);
			const response: any = await dispatch(listRestaurants(page + 1, limit, foodTypeSelected, ratingOpeSelected));
			if (mounted.current) {
				setTotalRestaurants(response.totalCount);
			}
		} catch (error) {
			console.log('The following error occurred:', error.message);
		}
	};
	/**
	 * Handle Query Change => Search
	 * @param event
	 */
	const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
		setQuery(event.target.value);
		setPage(1);
	};

	const handlePageChange = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
		setPage(newPage);
	};

	const handleLimitChange = (event: ChangeEvent<HTMLInputElement>) => {
		setLimit(parseInt(event.target.value, 10));
	};

	return (
		<Card>
			<CardHeader title="List of Restaurant Templates" action={<CreateRestaurant />} />
			<Divider />
			<CardContent>
				<Stack direction="row" flexWrap="wrap" alignItems="center" justifyContent="space-between" spacing={3}>
					<Box sx={{ flex: 1, m: 1, maxWidth: 200 }}>
						<FoodTypeFilter foodTypeSelected={foodTypeSelected} onChangeFoodTypeSelected={setFoodTypeSelected} />
					</Box>
					<Box sx={{ flex: 1, m: 1, maxWidth: 500 }}>
						<RatingFilter ratingSelected={ratingOpeSelected} onChangeRatingSelected={setRatingOpeSelected} />
					</Box>
				</Stack>
				<Table aria-label="table" sx={{ mt: 3 }}>
					<TableHead>
						<TableRow>
							<TableCell>No.</TableCell>
							<TableCell>Name</TableCell>
							<TableCell>Food Type</TableCell>
							<TableCell>Address</TableCell>
							<TableCell>Out Code</TableCell>
							<TableCell>Rating</TableCell>
							<TableCell align="right" width={130}>
								Actions
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{paginated.map((restaurant, index) => (
							<TableRow key={index}>
								<TableCell>{limit * page + index + 1}</TableCell>
								<TableCell sx={{ maxWidth: 250 }}>{restaurant.name}</TableCell>
								<TableCell width={150}>{restaurant.foodType}</TableCell>
								<TableCell>{restaurant.address}</TableCell>
								<TableCell width={200}> {restaurant.outcode} </TableCell>
								<TableCell>{restaurant.rating}</TableCell>
								<TableCell align="right" width={130}>
									<Box sx={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center' }}>
										<EditRestaurant restaurant={restaurant} />
										<DeleteRestaurant restaurant={restaurant} />
									</Box>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				<TablePagination
					component="div"
					count={totalRestaurants}
					onPageChange={handlePageChange}
					onRowsPerPageChange={handleLimitChange}
					page={page}
					rowsPerPage={limit}
					rowsPerPageOptions={[10, 25, 50]}
				/>
			</CardContent>
		</Card>
	);
};

export default RestaurantList;
