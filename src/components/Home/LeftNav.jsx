import classes from './LeftNav.module.scss';
import {
	FiSettings,
	FiBookmark,
	FiMessageSquare,
	FiHome,
	FiRss,
} from 'react-icons/fi';

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
					Logo={FiHome}
					msg={'Home'}
				/>
				<LeftNavItem
					link='settings'
					clicked={location.pathname.includes('/settings')}
					Logo={FiSettings}
					msg={'Settings'}
				/>
				<LeftNavItem
					link='messages'
					Logo={FiMessageSquare}
					clicked={location.pathname === '/messages'}
					msg={'Conversations'}
				/>
				<LeftNavItem
					link='savedPosts'
					clicked={location.pathname === '/savedPosts'}
					Logo={FiBookmark}
					msg={'Saved Posts'}
				/>
				<LeftNavItem
					link='feed'
					clicked={location.pathname === '/feed'}
					Logo={FiRss}
					msg={'Feed'}
				/>

				<span onClick={() => dispatch(logout())}>
					<LeftNavItem logout={true} Logo={AiOutlineLogout} msg={'Log out'} />
				</span>
			</ul>
		</Card>
	);
};

export default LeftNav;
