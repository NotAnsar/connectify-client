import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Forgotpassword from './Forgotpassword';

const AuthPage = () => {
	return (
		<Routes>
			<Route path='/' element={<Login />} />
			<Route path='/register' element={<Register />} />
			<Route path='/forgotpassword' element={<Forgotpassword />} />
			<Route path='*' element={<Navigate to='/' />} />
		</Routes>
	);
};

export default AuthPage;
