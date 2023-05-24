import { useState } from 'react';
import Card from '../utils/Card';
import ProfilePic from '../utils/ProfilePic';
import classes from './CreatePostCard.module.scss';
import {
	AiOutlineCamera,
	AiOutlineVideoCameraAdd,
	AiOutlinePaperClip,
	AiOutlineDelete,
} from 'react-icons/ai';

const CreatePostCard = ({ addNewPost }) => {
	const [content, setContent] = useState('');
	const [file, setFile] = useState();

	function submitHandler(e) {
		e.preventDefault();

		if (!(content || file)) {
			return;
		}

		console.log(file);
		console.log(content);

		addNewPost(content, file);
		setContent('');
		setFile('');
	}
	return (
		<Card>
			<form className={classes.newpostContainer} onSubmit={submitHandler}>
				<div className={classes.newpostInput}>
					<ProfilePic />
					<input
						type='text'
						onChange={(e) => setContent(e.target.value)}
						value={content}
						placeholder='What’s on your mind, Ansar ?'
					/>
				</div>
				{file && (
					<div className={classes.uploadedImage}>
						<img className='shareImg' src={URL.createObjectURL(file)} alt='' />
						<AiOutlineDelete onClick={() => setFile()} />
					</div>
				)}

				<div className={classes.publishPost}>
					<div className={classes.icons}>
						{/* <input type='file' placeholder={<AiOutlineCamera />} /> */}
						<label>
							<AiOutlineCamera /> <span>Images</span>
							<input type='file' onChange={(e) => setFile(e.target.files[0])} />
						</label>
						<label>
							<AiOutlineVideoCameraAdd /> Videos
							<input type='file' onChange={(e) => setFile(e.target.files[0])} />
						</label>

						<label>
							<AiOutlinePaperClip /> Documents
							<input type='file' onChange={(e) => setFile(e.target.files[0])} />
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
