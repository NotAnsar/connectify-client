import { createSlice } from '@reduxjs/toolkit';
import { makeRequest } from '../axios';

const initialState = {
	token: localStorage.getItem('token') || null,
	user: JSON.parse(localStorage.getItem('user')) || null,
};

export const authSlice = createSlice({
	name: 'token',
	initialState,
	reducers: {
		setToken: (state, action) => {
			state.token = action.payload;
			localStorage.setItem('token', action.payload);
			makeRequest.defaults.headers.common[
				'Authorization'
			] = `Bearer ${state.token}`;
		},
		setUser: (state, action) => {
			state.user = action.payload;
			localStorage.setItem('user', action.payload);
		},
		removeToken: (state) => {
			state.token = null;
			localStorage.removeItem('token');
		},
		removeUser: (state) => {
			state.user = null;
			localStorage.removeItem('user');
		},
		login: (state, action) => {
			const { token, user } = action.payload;
			state.token = token;
			state.user = user;
			localStorage.setItem('token', token);
			localStorage.setItem('user', JSON.stringify(user));
		},
		register: (state, action) => {
			const { token, user } = action.payload;
			state.token = token;
			state.user = user;
			localStorage.setItem('token', token);
			localStorage.setItem('user', JSON.stringify(user));
		},
		logout: (state) => {
			state.token = null;
			state.user = null;
			localStorage.removeItem('token');
			localStorage.removeItem('user');
		},
	},
});

export const {
	setToken,
	setUser,
	removeToken,
	removeUser,
	login,
	register,
	logout,
} = authSlice.actions;

export default authSlice.reducer;
