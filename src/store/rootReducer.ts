import { combineReducers } from '@reduxjs/toolkit';
import { reducer as settingsReducer } from 'layout/slice';
import { reducer as authReducer } from 'features/Authentication/slice';

import { reducer as restaurantReducer } from 'slices/restaurant';

const rootReducer = combineReducers({
	settings: settingsReducer,
	auth: authReducer,
	restaurant: restaurantReducer,
});

export default rootReducer;
