import { Fragment } from 'react';
import classes from './Navbar.module.scss';
import Notification from './Notification';

const NotificationModal = ({ notifications }) => {
	return (
		<Fragment>
			<div id='notification' className={classes.notificationWrapper}>
				<div className={classes.notification}>
					{notifications.map((n) => (
						<Notification
							key={n.id}
							user={{
								id: n.user_id,
								nom: n.nom,
								photo: n.photo,
								prenom: n.prenom,
								username: n.username,
								type: n.type,
								date: n.timestamp,
								seen: n.seen,
							}}
						/>
					))}
				</div>
			</div>
		</Fragment>
	);
};

export default NotificationModal;
