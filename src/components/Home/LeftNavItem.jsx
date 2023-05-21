import { Link } from 'react-router-dom';
import classes from './LeftNav.module.scss';

const LeftNavItem = ({ Logo, msg, clicked, logout, link = '' }) => {
	return (
		<li
			className={`${classes.link} ${clicked ? classes.clicked : ''} ${
				logout ? classes.logout : ''
			}`}
		>
			<Link to={link}>
				<ul>
					<li className={classes.logo}>
						<Logo />
					</li>
					<li className={`${classes.msg}`}>{msg} </li>
				</ul>
			</Link>
		</li>
	);
};

export default LeftNavItem;
