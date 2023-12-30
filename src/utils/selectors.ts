import { RootState } from 'store';

export const settingSelector = (state: RootState) => state.settings;
export const authSelector = (state: RootState) => state.auth;

export const restaurantSelector = (state: RootState) => state.restaurant;
