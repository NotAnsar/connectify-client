import { CgClose } from 'react-icons/cg';
import classes from './../Comment/Comment.module.scss';
import { Fragment, useState } from 'react';
import {
	AiOutlineCamera,
	AiOutlineDelete,
	AiOutlinePaperClip,
	AiOutlineVideoCameraAdd,
} from 'react-icons/ai';
import { makeRequest } from '../../../axios';

const UpdatePost = ({ showUpdated, name, post, postUpdated }) => {
	const [file, setFile] = useState();
	const [postImg, setPostImg] = useState(post.img);
	const [content, setContent] = useState(post.description);

	const adjustTextareaHeight = (event) => {
		const textarea = event.target;
		textarea.style.height = 'auto';
		textarea.style.height = `${textarea.scrollHeight}px`;
		setContent(textarea.value);
	};

	async function submitUpdate(e) {
		e.preventDefault();
		let img = null;
		const description = content ? content : null;
		if (file) {
			const data = new FormData();
			const fileName = Date.now() + file.name;
			data.append('name', fileName);
			data.append('file', file);
			img = file;
			try {
				const res = await makeRequest.post('/upload', data);
				console.log(res.data);
				img = res.data.filename;
			} catch (err) {
				console.log(err);
			}
		} else if (postImg) img = postImg;

		if (description || img) {
			const newPost = {
				...post,
				description,
				img,
			};
			console.log(newPost);
			try {
				const res = await makeRequest.patch(`posts/${post.id}`, {
					description,
					img,
				});

				console.log(res.data);
				postUpdated();
				showUpdated(false);
			} catch (error) {
				console.log(error);
			}
		}
	}

	return (
		<Fragment>
			<div className={classes.bg} onClick={() => showUpdated(false)}></div>
			<div className={classes.updateBox}>
				<div className={classes.title}>
					<h4>Update Post</h4>
					<CgClose onClick={() => showUpdated(false)} />
				</div>
				<div className={classes.comments}>
					<div className={classes.uploadedImage}>
						{!file && postImg && (
							<>
								<img src={'/upload/' + postImg} alt='' />
								<AiOutlineDelete onClick={() => setPostImg(null)} />
							</>
						)}
						{file && (
							<>
								<img src={URL.createObjectURL(file)} alt='' />

								<AiOutlineDelete onClick={() => setFile()} />
							</>
						)}
					</div>
				</div>

				<form className={classes.addComment} onSubmit={submitUpdate}>
					<div className={classes.contentContainer}>
						<textarea
							type='text'
							name='file'
							placeholder={`What’s on your mind, ${name}  ?`}
							value={content}
							onChange={adjustTextareaHeight}
							maxLength={250}
						/>
						<AiOutlineDelete onClick={() => setContent('')} />
					</div>
					<div className={classes.imgButtonContainer}>
						<div className={classes.icons}>
							<label>
								<AiOutlineCamera /> <span>Images</span>
								<input
									type='file'
									onChange={(e) => setFile(e.target.files[0])}
								/>
							</label>

							<label>
								<AiOutlineVideoCameraAdd /> Videos
								<input
									type='file'
									onChange={(e) => setFile(e.target.files[0])}
								/>
							</label>

							<label>
								<AiOutlinePaperClip /> Documents
								<input
									type='file'
									onChange={(e) => setFile(e.target.files[0])}
								/>
							</label>
						</div>
						<input type='submit' value='Save' />
					</div>
				</form>
			</div>
		</Fragment>
	);
};

export default UpdatePost;
