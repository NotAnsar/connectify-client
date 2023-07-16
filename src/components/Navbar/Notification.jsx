import moment from 'moment';
import ProfilePic from '../utils/ProfilePic';
import classes from './Navbar.module.scss';

const Notification = ({ user }) => {
	return (
		<div className={`${classes.user} ${user.seen ? classes.seen : ''}`}>
			<div className={classes.userInfo}>
				{<ProfilePic width='45px' user={user} withlink={false} />}

				<div className={classes.details}>
					<p>
						<span>
							{user.prenom} {user.nom}
						</span>{' '}
						{user.type === 'like' && 'liked your post'}
						{user.type === 'comment' && 'commented in your post.'}
						{user.type === 'follow' && 'started following you.'}
					</p>

					<span>{moment(user.date).fromNow()}</span>
				</div>
			</div>
		</div>
	);
};

export default Notification;
