import { Link } from 'react-router-dom';
import classes from './LeftNav.module.scss';

const LeftNavMobile = ({ Logo, clicked, logout, link = '' }) => {
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
				</ul>
			</Link>
		</li>
	);
};

export default LeftNavMobile;
