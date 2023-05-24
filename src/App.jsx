import { Route, Routes } from 'react-router-dom';
import './index.scss';

import Home from './components/Home/Home';
import { useSelector } from 'react-redux';
import AuthPage from './components/Auth/AuthPage';
import Profile from './components/Profile/Profile';
import { makeRequest } from './axios';

function App() {
	const { token, user } = useSelector((state) => state.auth);
	makeRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;

	return (
		<Routes>
			{user && <Route path='/*' element={<Home />} />}
			{user && token && <Route path='/profile/:id' element={<Profile />} />}
			{!user && <Route path='/*' element={<AuthPage />} />}
		</Routes>
	);
}

export default App;
