import classes from '../Suggestion/Suggestion.module.scss';
import Card from '../Card';
import { useEffect, useState } from 'react';
import { makeRequest } from '../../../axios';
import Firend from './Friend';
import { useSelector } from 'react-redux';

const FirendsAvailability = () => {
	const [friends, setFriends] = useState([]);
	const { online } = useSelector((state) => state.socket);

	// const [socket, setsocket] = useState();
	// const [onlineUsers, setOnlineUsers] = useState();
	// const { user } = useSelector((state) => state.auth);

	// useEffect(() => {
	// 	const socket = socketIOClient('http://localhost:3000', {
	// 		transports: ['websocket'],
	// 	});

	// 	setsocket(socket);
	// 	socket.emit('new-user-add', user.id);

	// 	return () => {
	// 		socket?.disconnect();
	// 	};
	// }, [user.id]);

	// useEffect(() => {
	// 	if (socket) {
	// 		socket.on('get-users', (a) => {
	// 			setOnlineUsers(a.map(({ userId }) => userId));
	// 		});
	// 	}
	// }, [socket]);

	useEffect(() => {
		getFriends();
	}, []);

	async function getFriends() {
		try {
			const res = await makeRequest.get('users/friends');

			setFriends(res.data.users);
		} catch (error) {
			setFriends(null);
			console.log(error);
		}
	}
	if (!online) return <></>;
	console.log(online);
	return (
		<Card>
			<div className={classes.suggestion}>
				<p>Friends</p>

				<div className={classes.users}>
					{friends.map((s) => (
						<Firend user={s} online={online} key={s.id} />
					))}
				</div>
			</div>
		</Card>
	);
};

export default FirendsAvailability;
