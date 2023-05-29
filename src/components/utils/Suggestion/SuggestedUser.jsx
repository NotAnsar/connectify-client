import { Link } from 'react-router-dom';
import ProfilePic from '../ProfilePic';
import classes from './Suggestion.module.scss';
import { useState } from 'react';
import { makeRequest } from '../../../axios';

const SuggestedUser = ({ user }) => {
	const [followed, setFollowed] = useState(user.is_following);
	function followUser() {
		follow();
		async function follow() {
			try {
				await makeRequest.get(`/follow/${user.id}`);

				setFollowed(followed === 1 ? 0 : 1);
			} catch (error) {
				console.log(error);
			}
		}
	}
	return (
		<div className={classes.user}>
			<div className={classes.info}>
				<ProfilePic width='40px' user={user} />

				<div className={classes.name}>
					<p>
						<Link to={'/profile/' + user.id}>
							{user.prenom} {user.nom}
						</Link>
					</p>
					<span>@{user.username}</span>
				</div>
			</div>

			<span
				className={`${followed ? classes.unfollow : classes.follow} `}
				onClick={followUser}
			>
				{followed ? 'Unfollow' : 'Follow'}
				{/* <div className={classes.online}></div> */}
			</span>
		</div>
	);
};

export default SuggestedUser;
