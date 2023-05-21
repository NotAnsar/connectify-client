import ProfilePic from '../ProfilePic';
import classes from './Comment.module.scss';

const Comment = ({ comment }) => {
	return (
		<div className={classes.comment}>
			<ProfilePic
				user={{
					nom: comment.nom,
					prenom: comment.prenom,
					photo: comment.photo,
				}}
			/>
			<div className={classes.commentContainer}>
				<h5>
					{comment.prenom} {comment.nom}
				</h5>
				<p>{comment.release_dt}</p>
				<span>{comment.content}</span>
			</div>
		</div>
	);
};

export default Comment;
