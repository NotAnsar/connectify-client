import { Fragment, useEffect, useState } from 'react';
import classes from './Post.module.scss';
import Card from '../utils/Card';
import CommentBox from '../utils/Comment/CommentBox';
import ProfilePic from '../utils/ProfilePic';
import { FiMessageCircle, FiHeart, FiBookmark } from 'react-icons/fi';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { makeRequest } from '../../axios';

const Post = ({ post, me }) => {
	const [show, setShow] = useState(false);
	const [comment, setComment] = useState('');
	const { user } = useSelector((state) => state.auth);
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

	useEffect(() => {
		document.body.style.overflow = show ? 'hidden' : '';
	}, [show]);

	function savePost() {
		save();
		async function save() {
			try {
				await makeRequest.post(
					`/savedPosts/${saved === 1 ? 'unsave' : 'save'}`,
					{ post_id: post.id }
				);

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
				await makeRequest.post(
					`likedPosts/${liked === 1 ? 'dislike' : 'like'}`,
					{ post_id: post.id }
				);

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
		setShow(true);
	}

	return (
		<Fragment>
			{show && comment && (
				<CommentBox
					showComment={setShow}
					commentChange={commentChange}
					comments={comment}
					postId={post.id}
				/>
			)}
			<Card>
				<div className={classes.cardContainer}>
					<div className={classes.userInfo}>
						<div className={classes.userDetails}>
							<ProfilePic
								width='50px'
								user={{
									prenom: post.prenom,
									photo: post.photo,
								}}
							/>
							<span>
								<h4>
									{post.nom} {post.prenom}
								</h4>
								<h6>{post.release_dt}</h6>
							</span>
						</div>

						{/* <div className={`${classes.userBtn} ${classes.follow}`}>
						<span>Follow</span>
					</div> */}

						{me ? (
							<div className={classes.myPost}>
								<span className={classes.edit}>
									<AiOutlineEdit />
								</span>
								<span className={classes.delete}>
									<AiOutlineDelete />
								</span>
							</div>
						) : (
							<div
								className={`${classes.userBtn} ${
									post.is_followed ? classes.following : classes.follow
								}`}
							>
								<span> {post.is_followed ? 'Following' : 'Follow'}</span>
							</div>
						)}
					</div>

					{post.img && (
						<div className={classes.contentImg}>
							<img src={post.img} alt='' />
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
							<span onClick={() => likePost()}>
								<FiHeart style={{ fill: liked === 1 && 'currentcolor' }} />
								<p>{post.likes}</p>
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
