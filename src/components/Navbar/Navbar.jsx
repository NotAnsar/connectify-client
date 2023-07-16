import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import classes from './Navbar.module.scss';
import { IoNotificationsOutline, IoNotifications } from 'react-icons/io5';
import ThemeToggler from '../Auth/ThemeToggler';
import Layout from '../utils/Layout';
import { Fragment, useEffect, useState } from 'react';
import ProfilePic from '../utils/ProfilePic';
import { Link } from 'react-router-dom';
import { makeRequest } from '../../axios';

import SearchModal from './SearchModal';
import NotificationModal from './NotificationModal';

const Navbar = () => {
	const [search, setSearch] = useState('');
	const [result, setResult] = useState([]);
	const [notifIsVisible, setNotifIsVisible] = useState(false);
	const [searchMobile, setSearchMobile] = useState(false);
	const [notifCount, setNotifCount] = useState(0);
	const [notifications, setNotifications] = useState([]);

	useEffect(() => {
		getNotifCount();
	}, []);

	function getUsers(e) {
		const value = e.target.value;
		setSearch(value);

		if (value === '') return;

		(async function () {
			try {
				const data = await makeRequest.post('/users/search', {
					searchData: value,
				});

				console.log(data.data.friends[0]);
				setResult(data.data.friends);
			} catch (error) {
				setResult(null);
				console.log(error);
			}
		})();
	}

	function getNotifCount() {
		(async function () {
			try {
				const data = await makeRequest.get('/notifications/count');

				setNotifCount(data.data.count);
			} catch (error) {
				setResult(null);
				console.log(error);
			}
		})();
	}

	function showNotifications() {
		(async function () {
			try {
				const data = await makeRequest.get('/notifications');
				console.log(data.data.notification);
				setNotifications(data.data.notification);
				setNotifIsVisible((a) => !a);
				setAllSeen();
				setNotifCount(0);
			} catch (error) {
				setNotifications(null);
				console.log(error);
			}
		})();

		async function setAllSeen() {
			try {
				await makeRequest.patch('/notifications');
			} catch (error) {
				console.log(error);
			}
		}
	}

	function onSubmit(e) {
		e.preventDefault();
		getUsers();
	}

	return (
		<Fragment>
			<header className={classes.container}>
				<Layout>
					<nav>
						<Link to='/'>
							<h1>Connectify</h1>
						</Link>
						<form className={classes.search} id='searchForm'>
							<input
								type='text'
								name='search'
								placeholder='Search...'
								onChange={getUsers}
								value={search}
							/>
							<span className={classes.laptop} type='submit' onClick={onSubmit}>
								<AiOutlineSearch />
							</span>
							<span
								className={classes.mobile}
								onClick={() => setSearchMobile((a) => !a)}
							>
								{searchMobile ? <AiOutlineClose /> : <AiOutlineSearch />}
							</span>
						</form>
					</nav>
					<nav>
						<div className={classes.themeTogglerNav}>
							<ThemeToggler />
						</div>

						<span className={classes.notification} onClick={showNotifications}>
							{notifCount !== 0 && (
								<div className={classes.count}>
									<p>{notifCount > 9 ? '+9' : notifCount}</p>
								</div>
							)}

							{notifIsVisible ? (
								<IoNotifications style={{ fill: 'var(--primary-color)' }} />
							) : (
								<IoNotificationsOutline />
							)}
						</span>

						<ProfilePic />
					</nav>
				</Layout>
			</header>
			<div
				className={`${classes.searchMobile}  ${
					searchMobile ? classes.show : ''
				}`}
			>
				<input
					type='text'
					name='search'
					value={search}
					placeholder='Search...'
					onChange={getUsers}
				/>
				<span /* onClick={onSubmit} */>Search</span>
			</div>

			<SearchModal
				searchMobile={searchMobile}
				search={search}
				result={result}
			/>

			{notifIsVisible && notifications && (
				<NotificationModal notifications={notifications} />
			)}
		</Fragment>
	);
};

export default Navbar;
