import classes from '../Suggestion/Suggestion.module.scss';
import Card from '../Card';
import { useEffect, useState } from 'react';
import { makeRequest } from '../../../axios';
import Firend from './Friend';
import { useSelector } from 'react-redux';

const FirendsAvailability = () => {
	const [friends, setFriends] = useState([]);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { socket } = useSelector((state) => state.socket);
	useEffect(() => {
		getFriends();
	}, []);
	// App.js

	useEffect(() => {
		if (socket) {
			socket.on('get-users', (a) =>
				setOnlineUsers(a.map(({ userId }) => userId))
			);
		}
	}, [socket]);

	async function getFriends() {
		try {
			const res = await makeRequest.get('users/friends');

			setFriends(res.data.users);
		} catch (error) {
			setFriends(null);
			console.log(error);
		}
	}
	return (
		<Card>
			<div className={classes.suggestion}>
				<p>Friends</p>

				<div className={classes.users}>
					{friends.map((s) => (
						<Firend user={s} online={onlineUsers} key={s.id} />
					))}
				</div>
			</div>
		</Card>
	);
};

export default FirendsAvailability;
