import { Link } from 'react-router-dom';
import ProfilePic from '../ProfilePic';
import classes from '../Suggestion/Suggestion.module.scss';
// import { useState } from 'react';
// import { makeRequest } from '../../../axios';

const Firend = ({ user, online }) => {
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

			<span>
				<div
					className={`${
						online.some((item) => item.userId === user.id)
							? classes.online
							: classes.offline
					}`}
				></div>
			</span>
		</div>
	);
};

export default Firend;
