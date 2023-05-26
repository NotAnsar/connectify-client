import ProfilePic from '../ProfilePic';
import classes from './Comment.module.scss';

import { AiOutlineDelete } from 'react-icons/ai';

const Comment = ({ comment, id, deleteComment }) => {
	return (
		<div className={classes.comment}>
			<ProfilePic
				user={{
					nom: comment.nom,
					prenom: comment.prenom,
					photo: comment.photo,
					id: comment.user_id,
				}}
			/>
			<div className={classes.commentContainer}>
				<div>
					<h5>
						{comment.prenom} {comment.nom}
					</h5>
					<p>{comment.release_dt}</p>
					<span>{comment.content}</span>
				</div>
				{id === comment.user_id && (
					<div
						className={classes.deleteContainer}
						onClick={() => deleteComment(comment.id)}
					>
						<AiOutlineDelete />
					</div>
				)}
			</div>
		</div>
	);
};

export default Comment;
