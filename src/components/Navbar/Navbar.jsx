import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import classes from './Navbar.module.scss';
import { IoNotificationsOutline } from 'react-icons/io5';
import ThemeToggler from '../Auth/ThemeToggler';
import Layout from '../utils/Layout';
import { Fragment, useState } from 'react';
import ProfilePic from '../utils/ProfilePic';
import { Link } from 'react-router-dom';

// import profilImg from '../../../images/pic (1).jpg';

const Navbar = () => {
	const [searchMobile, setSearchMobile] = useState(false);
	const [search, setSearch] = useState('');

	function submitForm(e) {
		e.preventDefault();
		console.log(search);
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
								onChange={(e) => setSearch(e.target.value)}
								value={search}
							/>
							<span
								className={classes.laptop}
								type='submit'
								onClick={submitForm}
							>
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
						<Link to='/profile'>
							<ProfilePic />
						</Link>
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
					onChange={(e) => setSearch(e.target.value)}
				/>
				<span onClick={submitForm}>Search</span>
			</div>
		</Fragment>
	);
};

export default Navbar;
