import { useSelector } from 'react-redux';
import classes from './Layout.module.scss';
import { Link } from 'react-router-dom';
import { imageUrl } from '../../axios';

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
						{user?.photo ? (
							<img src={imageUrl + encodeURIComponent(user?.photo)} alt='' />
						) : (
							<span className={classes.profile}>
								{user?.prenom.charAt(0).toUpperCase()}
							</span>
						)}
					</Link>
				) : user?.photo ? (
					<img src={imageUrl + encodeURIComponent(user?.photo)} alt='' />
				) : (
					<span className={classes.profile}>
						{user?.prenom.charAt(0).toUpperCase()}
					</span>
				)}
			</>
		</div>
	);
};

export default ProfilePic;
