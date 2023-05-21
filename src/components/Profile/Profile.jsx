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
} from 'react-icons/ai';

import Post from '../Home/Post';
import { useSelector } from 'react-redux';
import { makeRequest } from '../../axios';

const Profile = () => {
	const { user, token } = useSelector((state) => state.auth);
	const [posts, setPosts] = useState('');

	useEffect(() => {
		getMyPosts();
		async function getMyPosts() {
			try {
				const res = await makeRequest.get('posts/me', {
					// headers: {
					// 	Authorization: `Bearer ${token}`,
					// },
				});

				setPosts(res.data.posts);
			} catch (error) {
				console.log(error);
				setPosts(null);
			}
		}
		// return () => {
		// 	setPosts('');
		// };
	}, [token]);

	return (
		<Fragment>
			<Navbar />
			<section className={classes.coverImg}>
				{user.coverPhoto && <img src={user.coverPhoto} alt='' />}
			</section>
			<main className={classes.container}>
				<div className={classes.userDetails}>
					<div className={classes.userProfile}>
						<div className={classes.profileImg}>
							{user.photo ? (
								<img src={user.photo} />
							) : (
								<h5>{user.prenom.charAt(0).toUpperCase()}</h5>
							)}
						</div>
						<div className={classes.usernameContainer}>
							<h3>
								{user.prenom} {user.nom}
							</h3>
							<p className={classes.username}>@{user.username}</p>
						</div>
					</div>
					<div className={classes.userFollowers}>
						<div className={classes.box}>
							<span>241</span>
							<p>Following</p>
						</div>
						<div className={classes.box}>
							<span>20</span>
							<p>Followers</p>
						</div>
						<div className={classes.box}>
							<span>3</span>
							<p>Posts</p>
						</div>
						{/* <div className={`${classes.box} ${classes.follow}`}>
							<span>
								<AiOutlinePlus />
							</span>
							<p>Follow</p>
						</div>
						<div className={`${classes.box} ${classes.unfollow}`}>
							<span>
								<AiOutlineMinus />
							</span>
							<p>Unfollow</p>
						</div> */}
						<div className={`${classes.box} ${classes.editProfile}`}>
							<span>
								<FaUserEdit />
							</span>
						</div>
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
										{user.city}, {user.country}
									</b>
								</p>
							</div>
							<div>
								<AiOutlineFieldTime />
								<p>
									{/* Joined At <b>12 september 2022</b> */}
									Joined At <b>{new Date(user.release_dt).toDateString()}</b>
								</p>
							</div>
							<div>
								<AiFillHeart />
								<p>
									<b>{user.relationship}</b>{' '}
								</p>
							</div>
						</div>
					</div>
					<div className={classes.posts}>
						{posts === '' && <h1>Loading</h1>}
						{posts &&
							posts.map((p, key) => <Post post={p} key={key} me={true} />)}
					</div>
				</div>
			</main>
		</Fragment>
	);
};

export default Profile;
