import { useSelector } from 'react-redux';
import classes from './Layout.module.scss';
import { Link } from 'react-router-dom';

const ProfilePic = ({ width = '40px', user, withlink = true }) => {
	const me = useSelector((state) => state.auth.user);
	if (user === undefined) user = me;

	return (
		<div
			style={{
				minHeight: width,
				maxHeight: width,
				minWidth: width,
				maxWidth: width,
			}}
			className={classes.profileImg}
		>
			{/* <>
				{user.photo ? (
					withlink ? (
						<Link to={`/profile/${user?.id}`}>
							<img src={user.photo} alt='' />
						</Link>
					) : (
						<img src={user.photo} alt='' />
					)
				) : withlink ? (
					<Link to={`/profile/${user?.id}`}>
						<span className={classes.profile}>
							{user.prenom.charAt(0).toUpperCase()}
						</span>
					</Link>
				) : (
					<span className={classes.profile}>
						{user.prenom.charAt(0).toUpperCase()}
					</span>
				)}
			</> */}
			<>
				{withlink ? (
					<Link to={`/profile/${user?.id}`}>
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
