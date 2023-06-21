import { Link } from 'react-router-dom';
import ProfilePic from '../utils/ProfilePic';
import classes from './Navbar.module.scss';

const UserSearch = ({ user }) => {
	return (
		<Link to={`/profile/${user.id}`}>
			<div className={classes.user}>
				<div className={classes.userInfo}>
					{<ProfilePic width='45px' user={user} withlink={false} />}

					<div className={classes.details}>
						<p>
							{user.prenom} {user.nom}
						</p>

						<span>@{user.username}</span>
					</div>
				</div>
				{/* <p className={classes.lastDate}>.</p> */}
			</div>
		</Link>
	);
};

export default UserSearch;
