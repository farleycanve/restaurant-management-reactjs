import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { clearAuthTokens, setAuthTokens } from 'axios-jwt';
import { AppThunk } from 'store';
import { User } from 'types/user';
import { configAppInit } from 'utils/config';
import authApi from './api';

interface AuthState {
	isInitialized: boolean;
	isAuthenticated: boolean;
	isLoaded: boolean;
	isError: boolean;
	message: string;
	user: User | null;
}

const initialState: AuthState = {
	isInitialized: false,
	isAuthenticated: false,
	isLoaded: false,
	isError: false,
	message: '',
	user: null,
};

/**
 * Authentication Init
 * Check Authenticate
 */
export const authInit = createAsyncThunk('auth/init', async () => {
	let initState: AuthState = {
		isInitialized: true,
		isAuthenticated: false,
		isLoaded: false,
		isError: false,
		message: '',
		user: null,
	};

	try {
		const response: any = await authApi.profile();

		const user = response;

		initState.user = user;
		initState.isAuthenticated = true;

		return initState;
	} catch (error) {
		return initState;
	}
});

const slice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		/**
		 * Set Error
		 * @param state
		 * @param action
		 */
		setError: (state: AuthState, action: PayloadAction<any>) => {
			state.isError = true;
			state.message = action?.payload?.message || '';
		},
		// reset error
		resetError: (state: AuthState) => {
			state.isError = false;
			state.message = '';
		},
		/* Set Authenticated */
		setLoaded: (state, action) => {
			state.isLoaded = action.payload;
		},

		/* Login */
		login: (state: AuthState, action: PayloadAction<any>) => {
			const data = action.payload;
			setAuthTokens({
				accessToken: data.access_token,
				refreshToken: data?.refresh_token || 'empty',
			});
			state.isAuthenticated = true;
			state.user = { name: 'admin', email: 'admin@gmail.com', id: '24723981js' };
		},

		/* Logout */
		logout: state => {
			state.isAuthenticated = false;
			state.isLoaded = false;
			state.user = null;
			configAppInit.remove();
			clearAuthTokens();
			localStorage.clear();
			window.location.href = '/';
		},
		clearSession: state => {
			state.isAuthenticated = false;
			state.isLoaded = false;
			state.user = null;
			configAppInit.remove();
			clearAuthTokens();
			localStorage.clear();
		},

		/* Register */
		register: state => {},

		/* Recovery Password with enter Email */
		recovery: state => {},
	},
	extraReducers: builder => {
		builder.addCase(authInit.fulfilled, (state: AuthState, action: PayloadAction<any>) => {
			state = Object.assign(state, action.payload);
		});
	},
});
/**
 * Login
 * @param username
 * @param password
 * @returns
 */
export const login =
	(username: string, password: string): AppThunk =>
	async (dispatch): Promise<any> => {
		try {
			const response: any = await authApi.login(username, password);
			dispatch(slice.actions.login(response));
		} catch (error) {
			console.log('Error Login', error);
			dispatch(slice.actions.setError(error));
		}
	};

export const { reducer } = slice;
export default slice;
