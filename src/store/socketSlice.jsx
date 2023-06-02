import { createSlice } from '@reduxjs/toolkit';
import socketIOClient from 'socket.io-client';

const initialState = {
	socket: null,
	online: null,
};

const socketSlice = createSlice({
	name: 'socket',
	initialState,
	reducers: {
		initializeSocket: (state, action) => {
			const socket = socketIOClient('http://localhost:3000', {
				transports: ['websocket'],
			});
			state.socket = socket;

			socket.emit('new-user-add', action.payload);
		},
		setUsersOnline: (state, action) => {
			console.log(action.payload);
			state.online = action.payload;
		},

		disconnectSocket: (state) => {
			state.socket.disconnect();
			state.socket = null;
		},
	},
});

export const { initializeSocket, setUsersOnline, disconnectSocket } =
	socketSlice.actions;

export default socketSlice.reducer;
