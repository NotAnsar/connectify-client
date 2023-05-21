import { useSelector } from 'react-redux';
import classes from './Layout.module.scss';

const ProfilePic = ({ width = '40px', user }) => {
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
			{user.photo ? (
				<img src={user.photo} alt='' />
			) : (
				<span className={classes.profile}>
					{user.prenom.charAt(0).toUpperCase()}
				</span>
			)}
		</div>
	);
};

export default ProfilePic;
