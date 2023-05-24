import { Fragment, useEffect, useRef, useState } from 'react';
import ProfilePic from '../ProfilePic';
import Comment from './Comment';
import classes from './Comment.module.scss';

import { CgClose } from 'react-icons/cg';

const CommentBox = ({ showComment, comments, commentChange }) => {
	const [newComment, setNewComment] = useState('');
	const commentsContainerRef = useRef(null);

	function addComment(e) {
		e.preventDefault();
		addNewComment();

		async function addNewComment() {
			commentChange(newComment);
			setNewComment('');
		}
	}

	useEffect(() => {
		const commentsContainer = commentsContainerRef.current;
		if (commentsContainer) {
			commentsContainer.scrollTop = commentsContainer.scrollHeight;
		}
	}, [comments]);

	return (
		<Fragment>
			<div className={classes.bg} onClick={() => showComment(false)}></div>
			<div className={classes.commentBox}>
				<div className={classes.title}>
					<h4>Comment</h4>
					<CgClose onClick={() => showComment(false)} />
				</div>
				<div className={classes.comments} ref={commentsContainerRef}>
					{comments.map((c) => (
						<Comment comment={c} key={c.id} />
					))}
				</div>
				<form className={classes.addComment} onSubmit={addComment}>
					<ProfilePic width='35px' />
					<input
						type='text'
						name='comment'
						placeholder='Add comment'
						value={newComment}
						onChange={(e) => setNewComment(e.target.value)}
					/>
					<button>Comment</button>
				</form>
			</div>
		</Fragment>
	);
};

export default CommentBox;
