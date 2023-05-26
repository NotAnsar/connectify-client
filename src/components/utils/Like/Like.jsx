import { useState } from 'react';
import classes from '../Comment/Comment.module.scss';
import ProfilePic from '../ProfilePic';
import { Link } from 'react-router-dom';
import { makeRequest } from '../../../axios';

const Like = ({ like }) => {
	const [following, setfollowing] = useState(like.is_followed);

	function followUser() {
		follow();
		async function follow() {
			try {
				await makeRequest.get(`/follow/${like.id}`);

				setfollowing(following === 1 ? 0 : 1);
			} catch (error) {
				console.log(error);
			}
		}
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
						id: like.id,
					}}
				/>
				<div>
					<Link to={`/profile/${like?.id}`}>
						<h5>
							{like.prenom} {like.nom}
						</h5>
					</Link>
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
