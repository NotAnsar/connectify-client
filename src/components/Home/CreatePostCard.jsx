import { useState } from 'react';
import Card from '../utils/Card';
import ProfilePic from '../utils/ProfilePic';
import classes from './CreatePostCard.module.scss';
import {
	AiOutlineCamera,
	AiOutlineVideoCameraAdd,
	AiOutlinePaperClip,
} from 'react-icons/ai';

const CreatePostCard = () => {
	const [content, setContent] = useState('');
	function submitHandler(e) {
		e.preventDefault();
		console.log(content);
	}
	return (
		<Card>
			<form className={classes.newpostContainer} onSubmit={submitHandler}>
				<div className={classes.newpostInput}>
					<ProfilePic />
					<input
						type='text'
						defaultValue={content}
						onChange={(e) => setContent(e.target.value)}
						placeholder='What’s on your mind, Ansar ?'
					/>
				</div>
				<div className={classes.publishPost}>
					<div className={classes.icons}>
						{/* <input type='file' placeholder={<AiOutlineCamera />} /> */}
						<label>
							<AiOutlineCamera /> <span>Images</span>
							<input type='file' />
						</label>
						<label>
							<AiOutlineVideoCameraAdd /> Videos
							<input type='file' />
						</label>

						<label>
							<AiOutlinePaperClip /> Documents
							<input type='file' />
						</label>
					</div>
					<div className={classes.post}>
						<button>Post</button>
					</div>
				</div>
			</form>
		</Card>
	);
};

export default CreatePostCard;
