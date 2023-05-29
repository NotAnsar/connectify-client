import { useSelector } from 'react-redux';
import classes from './Layout.module.scss';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProfilePic = ({ width = '40px', user, withlink = true }) => {
	const me = useSelector((state) => state.auth.user);
	if (user === undefined) user = me;
	const { socket } = useSelector((state) => state.socket);
	const [onlineUsers, setOnlineUsers] = useState([]);

	useEffect(() => {
		if (socket) {
			socket.on('get-users', (a) =>
				setOnlineUsers(a.map(({ userId }) => userId))
			);
		}
	}, [socket]);

	console.log(onlineUsers, user.id);

	return (
		<div
			style={{
				minHeight: width,
				maxHeight: width,
				minWidth: width,
				maxWidth: width,
			}}
			className={`${classes.profileImg}`}
		>
			<>
				{withlink ? (
					<Link
						to={`/profile/${user?.id}`}
						style={{
							height: width,
							width: width,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						{user.photo ? (
							<img src={'/upload/' + encodeURIComponent(user?.photo)} alt='' />
						) : (
							<span className={classes.profile}>
								{user.prenom.charAt(0).toUpperCase()}
							</span>
						)}
					</Link>
				) : user.photo ? (
					<img src={'/upload/' + encodeURIComponent(user?.photo)} alt='' />
				) : (
					<span className={classes.profile}>
						{user.prenom.charAt(0).toUpperCase()}
					</span>
				)}
			</>
		</div>
	);
};

export default ProfilePic;
