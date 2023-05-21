import { useSelector } from 'react-redux';
import Card from '../utils/Card';
import ProfilePic from '../utils/ProfilePic';
import classes from './LeftNav.module.scss';

const ProfileCard = () => {
	const user = useSelector((state) => state.auth.user);

	return (
		<Card>
			<div className={classes.profileCard}>
				<div className={classes.profileCardContainer}>
					<ProfilePic width='48px' />
					<div className={classes.userInfo}>
						<p>
							{user.prenom} {user.nom}
						</p>
						<span>@{user.username}</span>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default ProfileCard;
