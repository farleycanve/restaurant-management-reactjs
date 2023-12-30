import { createSlice } from '@reduxjs/toolkit';
import { restaurantAPI } from 'api';

import { AppThunk } from 'store';
import { Restaurant } from 'types/restaurant';
import removeUndefinedKeys from 'utils/removeUndefinedKeys';

interface RestaurantState {
	restaurants: Restaurant[];
	isLoading: boolean;
	error: boolean;
}

const initialState: RestaurantState = {
	restaurants: [],
	isLoading: false,
	error: false,
};

const slice = createSlice({
	name: 'restaurant',
	initialState: initialState,
	reducers: {
		/* Set Status */
		setLoading: (state, action) => {
			state.isLoading = action.payload;
		},

		hasError: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},

		/* Get All Restaurants */
		list: (state, action) => {
			state.restaurants = action.payload.restaurants;
			state.isLoading = false;
		},

		/* Create Restaurant */
		create: (state, action) => {
			state.restaurants.unshift(action.payload);
			state.isLoading = false;
		},

		/* Update Restaurant */
		update: (state, action) => {
			const restaurant = action.payload;

			const index = state.restaurants.findIndex(x => x.id === restaurant.id);

			if (index > -1) {
				state.restaurants[index] = restaurant;
			} else {
				state.error = true;
			}
			state.isLoading = false;
		},

		/* Remove Restaurant */
		remove: (state, action) => {
			const index = state.restaurants.findIndex(x => x.id === action.payload);
			if (index > -1) {
				state.restaurants.splice(index, 1);
			}

			state.isLoading = false;
		},
	},
});

/**
 * List Restaurant
 * @param restaurantId
 * @returns
 */
export const listRestaurants =
	(page: number = 1, limit: number = 10, foodTypeSelected?, ratingOpeSelected?): AppThunk =>
	async (dispatch): Promise<any> => {
		let filter = { foodType: foodTypeSelected, ...ratingOpeSelected };
		filter = removeUndefinedKeys(filter);
		const response: any = await restaurantAPI.getAll(page, limit, filter);
		dispatch(slice.actions.list(response));
		return response;
	};

/**
 * Create Restaurant
 *
 * @param request
 * @returns
 */
export const createRestaurant =
	(request: any): AppThunk =>
	async (dispatch): Promise<void> => {
		const response: any = await restaurantAPI.create(request);
		dispatch(slice.actions.create(response));
		return response;
	};

/**
 * Update Restaurant
 * @param id
 * @param request
 * @returns
 */
export const updateRestaurant =
	(restaurantId: string, request: any): AppThunk =>
	async (dispatch): Promise<void> => {
		const response: any = await restaurantAPI.update(restaurantId, request);
		// console.log(response);
		dispatch(slice.actions.update(response));
		return response;
	};

/**
 * Delete Restaurant
 * @param id
 *
 * @returns
 */
export const deleteRestaurant =
	(restaurantId: string): AppThunk =>
	async (dispatch): Promise<void> => {
		await restaurantAPI.delete(restaurantId);
		dispatch(slice.actions.remove(restaurantId));
	};

export const { reducer, actions } = slice;
