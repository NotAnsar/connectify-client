import { useState } from 'react';
import classes from '../Comment/Comment.module.scss';
import ProfilePic from '../ProfilePic';

const Like = ({ isFollowing, like }) => {
	const [following, setfollowing] = useState(isFollowing);

	// console.log(like);
	function followUser() {
		// follow();
		// async function follow() {
		// 	try {
		// 		await makeRequest.post(
		// 			`/follow/${isFollowing === 1 ? 'unfollow' : 'follow'}`,
		// 			{ user_id: like.id }
		// 		);
		// 	} catch (error) {
		// 		console.log(error);
		// 	}

		// }
		setfollowing(following === 1 ? 0 : 1);
	}
	return (
		<div className={classes.like}>
			<div className={classes.userContainer}>
				<ProfilePic
					width='50px'
					user={{
						nom: like.nom,
						prenom: like.prenom,
						photo: like.photo,
					}}
				/>
				<div>
					<h5>
						{like.prenom} {like.nom}
					</h5>
					<p>@{like.username}</p>
				</div>
			</div>
			{!(like.me === like.id) && (
				<span
					className={`${classes.btn} ${!following && classes.follow}`}
					onClick={followUser}
				>
					{following ? 'following' : 'follow'}
				</span>
			)}
		</div>
	);
};

export default Like;
