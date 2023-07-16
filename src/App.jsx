import { Route, Routes } from 'react-router-dom';
import './index.scss';

import Home from './components/Home/Home';

import { useDispatch, useSelector } from 'react-redux';
import AuthPage from './components/Auth/AuthPage';
import Profile from './components/Profile/Profile';
import { makeRequest } from './axios';
import { useEffect } from 'react';

import {
	disconnectSocket,
	initializeSocket,
	setUsersOnline,
} from './store/socketSlice';
import { setMyUser } from './store/auth';

function App() {
	const { token, user } = useSelector((state) => state.auth);
	const { socket } = useSelector((state) => state.socket);
	makeRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	const dispatch = useDispatch();

	useEffect(() => {
		if (user) {
			console.log('connected');
			dispatch(initializeSocket(user.id));
		}

		return () => {
			console.log('disconnected');
			if (user) dispatch(disconnectSocket());
		};
	}, [dispatch, user]);

	useEffect(() => {
		if (socket) {
			socket.on('get-users', (a) => {
				dispatch(setUsersOnline(a));
			});
		}
	}, [socket, dispatch]);

	useEffect(() => {
		if (user) {
			(async function refreshUserData() {
				try {
					const res = await makeRequest.get('users/me');
					console.log(res.data.user);
					dispatch(setMyUser(res.data));
				} catch (error) {
					console.log(error);
				}
			})();
		}
	}, [dispatch]);

	return (
		<Routes>
			{user && <Route path='/*' element={<Home />} />}
			{user && token && <Route path='/profile/:id' element={<Profile />} />}
			{!user && <Route path='/*' element={<AuthPage />} />}
		</Routes>
	);
}

export default App;
