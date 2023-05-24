import { CgClose } from 'react-icons/cg';
import classes from './../Comment/Comment.module.scss';
import { Fragment } from 'react';

const UpdatePic = (showUpdatedPic, type = 'photo') => {
	return (
		<Fragment>
			<div className={classes.bg} onClick={() => showUpdatedPic(false)}></div>
			<div className={classes.commentBox}>
				<div className={classes.title}>
					<h4> {type ? 'Update Profile Pic' : 'Update Cover Photo'}</h4>
					<CgClose onClick={() => showUpdatedPic(false)} />
				</div>
				<div className={classes.comments}></div>
				<form className={classes.addComment}>
					<img src='' alt='' />
					<input type='file' name='file' placeholder='Add comment' />
					<button>Comment</button>
				</form>
			</div>
		</Fragment>
	);
};

export default UpdatePic;
