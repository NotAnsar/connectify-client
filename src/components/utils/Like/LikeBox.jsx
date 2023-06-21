import { Fragment } from 'react';

import classes from '../Comment/Comment.module.scss';
import { CgClose } from 'react-icons/cg';
import Like from './Like';

const LikeBox = ({ showLikes, likes, setLikes }) => {
	return (
		<Fragment>
			<div
				className={classes.bg}
				onClick={() => {
					showLikes(false);
					setLikes('');
				}}
			></div>
			<div className={classes.likeBox}>
				<div className={classes.title}>
					<h4>Likes</h4>
					<CgClose
						onClick={() => {
							showLikes(false);
							setLikes('');
						}}
					/>
				</div>
				<div className={classes.likes}>
					{likes.map((l) => (
						<Like like={l} key={l.id} />
					))}
				</div>
			</div>
		</Fragment>
	);
};

export default LikeBox;
