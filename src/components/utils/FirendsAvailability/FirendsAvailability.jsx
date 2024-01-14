import classes from '../Suggestion/Suggestion.module.scss';
import Card from '../Card';
import { useEffect, useState } from 'react';
import { makeRequest } from '../../../axios';
import Firend from './Friend';
import { useSelector } from 'react-redux';

const FirendsAvailability = () => {
	const [friends, setFriends] = useState([]);
	const { online } = useSelector((state) => state.socket);

	useEffect(() => {
		getFriends();
	}, []);

	async function getFriends() {
		try {
			const res = await makeRequest.get('users/friends');

			console.log(res.data.users);
			setFriends(res.data.users);
		} catch (error) {
			setFriends(null);
			console.log(error);
		}
	}

	if (!online) return <></>;

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
