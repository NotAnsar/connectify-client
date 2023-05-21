import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth';
import themeSlice from './themeSlice';

export const store = configureStore({
	reducer: {
		theme: themeSlice,
		auth: authSlice,
	},
});
