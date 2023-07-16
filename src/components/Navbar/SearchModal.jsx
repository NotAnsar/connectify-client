import { useEffect, useState } from 'react';
import classes from './Navbar.module.scss';
import UserSearch from './UserSearch';

const SearchModal = ({ searchMobile, search, result }) => {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth);

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<>
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
		</>
	);
};

export default SearchModal;
