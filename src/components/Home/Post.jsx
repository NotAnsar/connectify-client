import { Fragment, useEffect, useState } from 'react';
import classes from './Post.module.scss';
import Card from '../utils/Card';
import CommentBox from '../utils/Comment/CommentBox';
import ProfilePic from '../utils/ProfilePic';
import UpdatePost from '../utils/UpdatePost/UpdatePost';

import { FiMessageCircle, FiHeart, FiBookmark } from 'react-icons/fi';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { imageUrl, makeRequest } from '../../axios';
import LikeBox from '../utils/Like/LikeBox';

import { Link } from 'react-router-dom';

const Post = ({ post, me, postDeleted, postUpdated }) => {
	const { user } = useSelector((state) => state.auth);
	const [showL, setShowL] = useState(false);
	const [showC, setShowC] = useState(false);
	const [showE, setShowE] = useState(false);
	const [comment, setComment] = useState('');
	const [likes, setLikes] = useState('');
	const [saved, setSaved] = useState(post.is_saved);
	const [liked, setLiked] = useState(post.is_liked);

	const commentChange = (newComment, status = 'added') => {
		if (status === 'added') {
			addNewComment();
		}
		async function addNewComment() {
			try {
				const res = await makeRequest.post('/comments', {
					content: newComment,
					post_id: post.id,
				});

				setComment((c) => [
					...c,
					{
						photo: user.photo,
						nom: user.nom,
						prenom: user.prenom,
						...res.data.comment,
					},
				]);
				post.comments++;
			} catch (error) {
				console.log(error);
			}
		}
	};

	async function deleteComment(id) {
		try {
			await makeRequest.delete(`/comments/${id}`);

			setComment(comment.filter((c) => c.id !== id));
			post.comments--;
		} catch (error) {
			console.log('error');
		}
	}

	async function deletePost(postId) {
		try {
			await makeRequest.delete(`posts/${postId}`);

			postDeleted();
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		document.body.style.overflow = showC || showL || showE ? 'hidden' : '';
	}, [showC, showL, showE]);

	function savePost() {
		save();
		async function save() {
			try {
				await makeRequest.post(`/saves/${saved === 1 ? 'unsave' : 'save'}`, {
					post_id: post.id,
				});

				setSaved(saved === 1 ? 0 : 1);
			} catch (error) {
				console.log(error);
			}
		}
	}

	function likePost() {
		like();
		async function like() {
			try {
				await makeRequest.post(`likes/${liked === 1 ? 'dislike' : 'like'}`, {
					post_id: post.id,
				});

				setLiked(liked === 1 ? 0 : 1);
				liked ? post.likes-- : post.likes++;
			} catch (error) {
				console.log(error);
			}
		}
	}

	function showComment() {
		getComment();
		async function getComment() {
			try {
				const res = await makeRequest.get(`comments/${post.id}`);

				setComment(res.data.comments);
			} catch (error) {
				console.log(error);
				setComment(null);
			}
		}
		setShowC(true);
	}

	function showLike() {
		getLikes();
		async function getLikes() {
			try {
				const res = await makeRequest.get(`likes/${post.id}`);

				setLikes(res.data.likes);
			} catch (error) {
				console.log(error);
				setLikes(null);
			}
		}

		setShowL(true);
	}

	return (
		<Fragment>
			{comment && showC && (
				<CommentBox
					deleteComment={deleteComment}
					showComment={setShowC}
					commentChange={commentChange}
					comments={comment}
					postId={post.id}
					id={user.id}
					setComment={setComment}
				/>
			)}
			{showE && (
				<UpdatePost
					name={user.prenom}
					showUpdated={setShowE}
					post={post}
					postUpdated={postUpdated}
				/>
			)}

			{showL && likes && (
				<LikeBox likes={likes} showLikes={setShowL} setLikes={setLikes} />
			)}

			<Card>
				<div className={classes.cardContainer}>
					<div className={classes.userInfo}>
						<div className={classes.userDetails}>
							<ProfilePic
								width='50px'
								user={{
									prenom: post.prenom,
									id: post.user_id,
									photo: post.photo,
								}}
							/>
							<span>
								<h4 className={classes.toProfile}>
									<Link to={'/profile/' + post.user_id}>
										{post.nom} {post.prenom}
									</Link>
								</h4>
								<h6>{moment(post.release_dt).fromNow()}</h6>
							</span>
						</div>

						{me && (
							<div className={classes.myPost}>
								<span className={classes.edit} onClick={() => setShowE(true)}>
									<AiOutlineEdit />
								</span>
								<span
									className={classes.delete}
									onClick={() => deletePost(post.id)}
								>
									<AiOutlineDelete />
								</span>
							</div>
						)}
					</div>

					{post.img && (
						<div className={classes.contentImg}>
							<img src={`${imageUrl}${encodeURIComponent(post.img)}`} alt='' />
						</div>
					)}

					{post.description && (
						<div className={classes.contentTxt}>{post.description}</div>
					)}

					<div className={classes.buttons}>
						<div className={classes.iconLeft}>
							<span onClick={() => savePost()}>
								<FiBookmark style={{ fill: saved === 1 && 'currentcolor' }} />
							</span>
						</div>
						<div className={classes.iconRight}>
							<span>
								<FiHeart
									onClick={() => likePost()}
									style={{ fill: liked === 1 && 'currentcolor' }}
								/>
								<p onClick={showLike} className={classes.likeCount}>
									{post.likes}
								</p>
							</span>
							<span className={classes.comment} onClick={showComment}>
								<FiMessageCircle />
								<p>{post.comments}</p>
							</span>
						</div>
					</div>
				</div>
			</Card>
		</Fragment>
	);
};

export default Post;
