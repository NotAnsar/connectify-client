import classes from './LeftNav.module.scss';
import { FiSettings, FiUsers, FiBookmark } from 'react-icons/fi';
import { BiHomeAlt } from 'react-icons/bi';
import { BsPalette } from 'react-icons/bs';
import { AiOutlineLogout } from 'react-icons/ai';
import LeftNavItem from './LeftNavItem';
import Card from '../utils/Card';
import { useLocation } from 'react-router-dom';
import { logout } from '../../store/auth';
import { useDispatch } from 'react-redux';

const LeftNav = () => {
	const location = useLocation();
	const dispatch = useDispatch();

	return (
		<Card>
			<ul className={classes.linksContainer}>
				<LeftNavItem
					clicked={location.pathname === '/'}
					Logo={BiHomeAlt}
					msg={'Home'}
				/>
				<LeftNavItem
					link='settings'
					clicked={location.pathname.includes('/settings')}
					Logo={FiSettings}
					msg={'Settings'}
				/>
				<LeftNavItem
					link='newfriends'
					Logo={FiUsers}
					clicked={location.pathname === '/newfriends'}
					msg={'Find Friends'}
				/>
				<LeftNavItem
					link='savedPosts'
					clicked={location.pathname === '/savedPosts'}
					Logo={FiBookmark}
					msg={'Saved Posts'}
				/>
				<LeftNavItem
					link='theme'
					clicked={location.pathname === '/theme'}
					Logo={BsPalette}
					msg={'Theme'}
				/>
				<span onClick={() => dispatch(logout())}>
					<LeftNavItem logout={true} Logo={AiOutlineLogout} msg={'Log out'} />
				</span>
			</ul>
		</Card>
	);
};

export default LeftNav;
