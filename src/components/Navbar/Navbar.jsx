import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import classes from './Navbar.module.scss';
import { IoNotificationsOutline } from 'react-icons/io5';
import ThemeToggler from '../Auth/ThemeToggler';
import Layout from '../utils/Layout';
import { Fragment, useEffect, useState } from 'react';
import ProfilePic from '../utils/ProfilePic';
import { Link } from 'react-router-dom';
import { makeRequest } from '../../axios';
import UserSearch from './UserSearch';

const Navbar = () => {
	const [search, setSearch] = useState('');
	const [result, setResult] = useState([]);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [searchMobile, setSearchMobile] = useState(false);

	useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth);

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
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

						<span className={classes.notification}>
							<IoNotificationsOutline />
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

			{(windowWidth > 680 || searchMobile) && search !== '' && (
				<div className={classes.searchWrapper}>
					<div className={classes.searchResult}>
						{result.length === 0 ? (
							<p>No user was found with this name</p>
						) : (
							<>
								{result.map((r) => {
									console.log(r);
									return <UserSearch user={r} key={r.id} />;
								})}
							</>
						)}
					</div>
				</div>
			)}
		</Fragment>
	);
};

export default Navbar;
