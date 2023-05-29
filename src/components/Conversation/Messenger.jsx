import ProfilePic from '../utils/ProfilePic';
import classes from './Conversation.module.scss';

const Messenger = () => {
	return (
		<div className={classes.messenger}>
			<div className={classes.userInfo}>
				<ProfilePic width='45px' />

				<div className={classes.details}>
					<p>Karroauch Ansar</p>
					<span>Last Message</span>
				</div>
			</div>

			{/* <p className={classes.lastDate}>Last Monday</p> */}
		</div>
	);
};

export default Messenger;
