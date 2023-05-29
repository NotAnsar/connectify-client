import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth';
import themeSlice from './themeSlice';
import socketSlice from './socketSlice';

export const store = configureStore({
	reducer: {
		theme: themeSlice,
		auth: authSlice,
		socket: socketSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});
