import ProfilePic from '../utils/ProfilePic';
import classes from './Conversation.module.scss';
import moment from 'moment';

const Messenger = ({ conversation, getMessages }) => {
	const user = {
		id: conversation.id,
		nom: conversation.nom,
		photo: conversation.photo,
		prenom: conversation.prenom,
	};

	return (
		<div
			className={classes.messenger}
			onClick={() => getMessages(conversation.conversation_id, user)}
		>
			<div className={classes.userInfo}>
				<ProfilePic width='45px' user={user} withlink={false} />

				<div className={classes.details}>
					<p>
						{user.nom} {user.prenom}
					</p>
					<span>{conversation.last_message}</span>
				</div>
			</div>

			<p className={classes.lastDate}>
				{moment(conversation.release_dt).fromNow(true)}
			</p>
		</div>
	);
};

export default Messenger;
