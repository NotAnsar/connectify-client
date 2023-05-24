import { Fragment, useEffect, useState } from 'react';
import classes from './Profile.module.scss';
import Navbar from '../Navbar/Navbar';

import { FaUserEdit } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import {
	AiOutlinePlus,
	AiOutlineMinus,
	AiOutlineFieldTime,
	AiFillHeart,
	AiOutlineEdit,
	AiOutlineDelete,
} from 'react-icons/ai';

import Post from '../Home/Post';

import { makeRequest } from '../../axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Alert from '../utils/Alert';

const Profile = () => {
	const { id: myId } = useSelector((state) => state.auth.user);
	const { id } = useParams();

	const [posts, setPosts] = useState('');
	const [user, setUser] = useState('');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [alert, setalert] = useState(false);

	async function getMyPosts() {
		try {
			const url1 = makeRequest.get(`users/profile/${id}`);
			const url2 = makeRequest.get(`posts/${id}`);

			const [res1, res2] = await Promise.all([url1, url2]);

			setUser(res1.data.user);
			setPosts(res2.data.posts);

			setLoading(false);
		} catch (error) {
			setError(error.response.data.message);
			setLoading(false);
			setPosts(null);
			setUser(null);
		}
	}
	useEffect(() => {
		getMyPosts();
	}, [id]);

	function postDeleted() {
		getMyPosts();
		setalert('Post Deleted');
	}

	if (error) {
		return <h1>{error}</h1>;
	}
	if (loading) {
		return <h1>Loading</h1>;
	}

	return (
		<Fragment>
			{alert && <Alert msg={alert} setAlert={setalert} color={'red'} />}
			<Navbar />
			<section className={classes.coverImg}>
				{user?.coverPhoto && <img src={user?.coverPhoto} alt='' />}
				{myId === +id && (
					<div className={classes.editCoverPhoto}>
						<AiOutlineEdit className={classes.edit} />
						<AiOutlineDelete className={classes.delete} />
					</div>
				)}
			</section>
			<main className={classes.container}>
				<div className={classes.userDetails}>
					<div className={classes.userProfile}>
						<div className={classes.profileImg}>
							{user?.photo ? (
								<img src={user?.photo} />
							) : (
								<h5>{user?.prenom.charAt(0).toUpperCase()}</h5>
							)}

							{myId === +id && (
								<div className={classes.editPhoto}>
									<div className={classes.edit}>
										<AiOutlineEdit />
									</div>
									<div className={classes.delete}>
										<AiOutlineDelete />
									</div>
								</div>
							)}
						</div>
						<div className={classes.usernameContainer}>
							<h3>
								{user?.prenom} {user?.nom}
							</h3>
							<p className={classes.username}>@{user?.username}</p>
						</div>
					</div>
					<div className={classes.userFollowers}>
						<div className={classes.box}>
							<span>{user?.following}</span>
							<p>Following</p>
						</div>
						<div className={classes.box}>
							<span>{user?.followers}</span>
							<p>Followers</p>
						</div>

						<div className={classes.box}>
							<span>{posts.length}</span>
							<p>Posts</p>
						</div>
						{+id !== myId ? (
							user.is_followed ? (
								<div className={`${classes.box} ${classes.unfollow}`}>
									<span>
										<AiOutlineMinus />
									</span>
									<p>Unfollow</p>
								</div>
							) : (
								<div className={`${classes.box} ${classes.follow}`}>
									<span>
										<AiOutlinePlus />
									</span>
									<p>Follow</p>
								</div>
							)
						) : (
							<div className={`${classes.box} ${classes.editProfile}`}>
								<span>
									<FaUserEdit />
								</span>
							</div>
						)}
					</div>
				</div>
				<div className={classes.postsInfo}>
					<div className={classes.info}>
						<h2>Info</h2>
						<p>
							Lorem ipsum dolor sit amet, cons ectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et.Lorem ipsum dolor sit amet,
							cons ectetur adipiscing elit,.
						</p>

						<div className={classes.line}></div>

						<div className={classes.icons}>
							<div>
								<MdLocationOn />
								<p>
									Lives in{' '}
									<b>
										{user?.city}, {user?.country}
									</b>
								</p>
							</div>
							<div>
								<AiOutlineFieldTime />
								<p>
									{/* Joined At <b>12 september 2022</b> */}
									Joined At <b>{new Date(user?.release_dt).toDateString()}</b>
								</p>
							</div>
							<div>
								<AiFillHeart />
								<p>
									<b>{user?.relationship}</b>{' '}
								</p>
							</div>
						</div>
					</div>
					<div className={classes.posts}>
						{posts === '' && <h1>Loading</h1>}
						{posts &&
							posts.map((p) => (
								<Post
									post={p}
									key={p.id}
									me={+id === myId}
									getPosts={postDeleted}
								/>
							))}
					</div>
				</div>
			</main>
		</Fragment>
	);
};

export default Profile;
