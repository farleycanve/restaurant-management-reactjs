import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { configSettings } from 'utils/config';
import { THEMES } from 'utils/constants';

interface SettingsState {
	compact?: boolean;
	direction?: 'ltr' | 'rtl';
	responsiveFontSizes?: boolean;
	roundedCorners?: boolean;
	theme?: string;
	language: string;
}

const initialState: SettingsState = {
	compact: true,
	direction: 'ltr',
	responsiveFontSizes: true,
	roundedCorners: true,
	theme: THEMES.LIGHT,
	language: 'en',
};

export const restoreSettings = createAsyncThunk('settings/init', () => {
	let settings = null;

	const storageSettings = configSettings.get();

	if (storageSettings) {
		settings = storageSettings;
	} else {
		settings = {
			compact: true,
			direction: 'ltr',
			responsiveFontSizes: true,
			roundedCorners: true,
			theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? THEMES.LIGHT : THEMES.LIGHT,
		};
	}

	return settings ? settings : initialState;
});

const slice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		save: (state: SettingsState, action: PayloadAction<any>) => {
			state = Object.assign(state, action.payload);
		},
	},
	extraReducers: builder => {
		builder.addCase(restoreSettings.fulfilled, (state: SettingsState, action) => {
			state = Object.assign(state, action.payload);
		});
	},
});

export const selectorSettings = (state: RootState) => state.settings;
export const { reducer } = slice;
export default slice;
