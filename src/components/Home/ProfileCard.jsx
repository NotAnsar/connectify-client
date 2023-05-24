import { useSelector } from 'react-redux';
import Card from '../utils/Card';
import ProfilePic from '../utils/ProfilePic';
import classes from './LeftNav.module.scss';
import { Link } from 'react-router-dom';

const ProfileCard = () => {
	const user = useSelector((state) => state.auth.user);

	return (
		<Card>
			<div className={classes.profileCard}>
				<Link to={`/profile/${user?.id}`}>
					<div className={classes.profileCardContainer}>
						<ProfilePic width='48px' withlink={false} />
						<div className={classes.userInfo}>
							<p>
								{user.prenom} {user.nom}
							</p>
							<span>@{user.username}</span>
						</div>
					</div>
				</Link>
			</div>
		</Card>
	);
};

export default ProfileCard;
