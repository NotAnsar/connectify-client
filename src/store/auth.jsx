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
		setMyUser: (state, action) => {
			const { user } = action.payload;
			state.user = user;
			localStorage.setItem('user', JSON.stringify(user));
		},
		setProfilePic: (state, action) => {
			const { photo } = action.payload;
			const updatedUser = { ...state.user, photo };

			localStorage.setItem('user', JSON.stringify(updatedUser));
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
	setMyUser,
	setProfilePic,
	removeToken,
	removeUser,
	login,
	register,
	logout,
} = authSlice.actions;

export default authSlice.reducer;
