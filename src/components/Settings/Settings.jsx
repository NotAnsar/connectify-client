import classes from './Settings.module.scss';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword';
import DeleteAccount from './DeleteAccount';

const Settings = () => {
	const location = useLocation();

	const path = location.pathname.split('/').filter(Boolean);

	return (
		<section className={classes.settingsWrapper}>
			{path[1] === undefined && <h1>Edit Profile</h1>}
			{path[1] === 'change-password' && <h1>Change Password</h1>}
			{path[1] === 'delete-account' && <h1>Delete Account</h1>}

			<ul>
				<Link to={''}>
					<li className={path[1] === undefined ? classes.clicked : ''}>
						Edit User Info
					</li>
				</Link>
				<Link to={'change-password'}>
					<li
						className={`${
							path[1] === 'change-password' ? classes.clicked : ''
						}`}
					>
						Change Password
					</li>
				</Link>
				<Link to={'delete-account'}>
					<li
						className={`${
							path[1] === 'delete-account'
								? `${classes.clicked} ${classes.error}`
								: ''
						}`}
					>
						Delete Account
					</li>
				</Link>
			</ul>
			<div className={classes.itemContainer}>
				<Routes>
					<Route path='' element={<EditProfile />} />
					<Route path='change-password' element={<ChangePassword />} />
					<Route path='delete-account' element={<DeleteAccount />} />
					<Route path='*' element={<Navigate to={''} />} />
				</Routes>
			</div>
		</section>
	);
};

export default Settings;
