import { Fragment, useEffect, useRef, useState } from 'react';
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

import { imageUrl, makeRequest } from '../../axios';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../utils/Alert';
import { setMyUser } from '../../store/auth';
import Loader from '../utils/Loader';

const Profile = () => {
	const { user: me } = useSelector((state) => state.auth);
	const myId = me.id;
	const { id } = useParams();
	const dispatch = useDispatch();
	const [posts, setPosts] = useState('');
	const [user, setUser] = useState('');
	const [coverpic, setcoverpic] = useState();
	const [profilePic, setProfilePic] = useState();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [alert, setalert] = useState(false);
	const [followed, setFollowed] = useState();
	const location = useLocation();
	const [showEdit, setshowEdit] = useState({ left: false, right: false });
	const containerRef = useRef(null);

	const alertMsg = location.state && location.state.alertMsg;

	const { socket } = useSelector((state) => state.socket);

	const handleMouseEnter = (event) => {
		const containerRect = containerRef.current.getBoundingClientRect();
		const hoverPosition = event.clientX - containerRect.left;

		if (hoverPosition <= 75) {
			setshowEdit({ left: true, right: false });
		} else {
			setshowEdit({ left: false, right: true });
		}
	};

	const handleMouseLeave = () => {
		setshowEdit({ left: false, right: false });
	};

	useEffect(() => {
		const eventListener = (a) => {
			if (id == a[0]) setFollowed(a[1]);
		};

		if (socket) socket.on('user-follow', eventListener);

		return () => socket && socket.off('user-follow', eventListener);
	}, [socket, id]);

	useEffect(() => {
		if (alertMsg) setalert(alertMsg);
	}, [alertMsg]);

	useEffect(() => {
		getMyPosts();

		return () => {
			setPosts('');
			setLoading(true);
		};
	}, [id, me.photo, me.coverPhoto]);

	useEffect(() => {
		document.body.style.overflow = coverpic || profilePic ? 'hidden' : '';
	}, [coverpic, profilePic]);

	const getMyPosts = async () => {
		try {
			console.log(id);
			const url1 = makeRequest.get(`users/profile/${id}`);
			const url2 = makeRequest.get(`posts/${id}`);

			const [res1, res2] = await Promise.all([url1, url2]);

			setUser(res1.data.user);
			console.log(`posts/${id}`);
			console.log(res2.data.posts);
			setPosts(res2.data.posts);
			setFollowed(res1.data.user.is_followed);
			setLoading(false);
		} catch (error) {
			setError(error.response.data.message);
			setLoading(false);
			setPosts(null);
			setUser(null);
		}
	};

	async function updatePicConfirm(status = 'profile') {
		let img = null;
		let pic;
		if (status === 'profile' && profilePic) {
			pic = profilePic;
		} else if (status === 'cover' && coverpic) pic = coverpic;
		else if (status === 'deleteProfile' || status === 'deleteCover') {
			pic = null;
		} else {
			console.log('Something went Wrongs');
			return;
		}
		console.log(pic);
		if (pic) {
			const data = new FormData();
			const fileName = Date.now() + pic.name;
			data.append('name', fileName);
			data.append('file', pic);

			try {
				console.log('request');
				const res = await makeRequest.post('/upload', data);
				console.log(res.data);
				img = res.data.filename;
				console.log('uploaded', img);
				setProfilePic();
				setcoverpic();
			} catch (err) {
				console.log(err);
			}
		}
		let obj = {};
		if (status === 'profile') obj = { photo: img };
		else if (status === 'cover') obj = { coverPhoto: img };
		else if (status === 'deleteCover') {
			obj = { coverPhoto: img };
			if (!me.coverPhoto) return;
		} else if (status === 'deleteProfile') {
			obj = { photo: img };
			if (!me.photo) return;
		} else {
			console.log('problem 2');
			return;
		}

		update();
		async function update() {
			try {
				const res = await makeRequest.patch('users', obj);

				dispatch(setMyUser(res.data));

				if (status === 'profile') setalert('Profile Pic Changed');

				if (status === 'cover') setalert('Cover Pic Changed');

				if (status === 'deleteCover') setalert('Cover Pic Deleted');

				if (status === 'deleteProfile') setalert('Profile Pic Deleted');
			} catch (error) {
				console.log(error);
			}
		}
	}

	function postDeleted() {
		getMyPosts();
		setalert('Post Deleted');
	}
	function postUpdated() {
		getMyPosts();
		setalert('Post Updated');
	}

	function updatePic(e, type) {
		if (type === 'cover') {
			setcoverpic(e.target.files[0]);
			setProfilePic();
		}
		if (type === 'profile') {
			setProfilePic(e.target.files[0]);
			setcoverpic();
		}
	}

	if (error) {
		return <h1>{error}</h1>;
	}
	if (loading) {
		return <Loader profile={true} />;
	}

	function followUser() {
		follow();
		async function follow() {
			try {
				await makeRequest.get(`/follow/${user.id}`);

				setFollowed(followed === 1 ? 0 : 1);
			} catch (error) {
				console.log(error);
			}
		}
	}

	return (
		<Fragment>
			{alert && (
				<Alert
					msg={alert}
					setAlert={setalert}
					color={alert.includes('Updated') ? '' : 'red'}
				/>
			)}
			{(coverpic || profilePic) && (
				<div className={classes.confirmUpdate}>
					<span
						onClick={() => {
							coverpic && updatePicConfirm('cover');
							profilePic && updatePicConfirm('profile');
						}}
					>
						{coverpic
							? 'Click to Change Cover Pic'
							: 'Click to Change Profile Pic'}
					</span>
					<span
						onClick={() => {
							setProfilePic();
							setcoverpic();
						}}
					>
						Cancel
					</span>
				</div>
			)}
			<Navbar />
			<section className={classes.coverImg}>
				{coverpic && (
					<img
						className='editCoverPic'
						src={URL.createObjectURL(coverpic)}
						alt=''
					/>
				)}
				{user?.coverPhoto && !coverpic && (
					<img
						src={`${imageUrl}${encodeURIComponent(user?.coverPhoto)}`}
						alt=''
					/>
				)}

				{myId === +id && (
					<div className={classes.editCoverPhoto}>
						<label className={classes.label}>
							<AiOutlineEdit className={classes.edit} />
							<input
								className={classes.input}
								type='file'
								onChange={(e) => updatePic(e, 'cover')}
							/>
						</label>

						<AiOutlineDelete
							className={classes.delete}
							onClick={() => updatePicConfirm('deleteCover')}
						/>
					</div>
				)}
			</section>
			<main className={classes.container}>
				<div className={classes.userDetails}>
					<div className={classes.userProfile}>
						<div className={classes.profileImg}>
							{user?.photo && !profilePic && (
								<img src={imageUrl + encodeURIComponent(user?.photo)} alt='' />
							)}
							{!user?.photo && !profilePic && (
								<h5>{user?.prenom.charAt(0).toUpperCase()}</h5>
							)}

							{profilePic && (
								<img
									className='editCoverPic'
									src={URL.createObjectURL(profilePic)}
									alt=''
								/>
							)}

							{myId === +id && (
								<div
									className={classes.editPhoto}
									onMouseMove={handleMouseEnter}
									onMouseLeave={handleMouseLeave}
									ref={containerRef}
								>
									{showEdit.left && (
										<label className={`${classes.edit} ${classes.label}`}>
											<AiOutlineEdit />
											<input
												type='file'
												className={classes.input}
												onChange={(e) => updatePic(e, 'profile')}
											/>
										</label>
									)}

									{showEdit.right && (
										<div
											className={classes.delete}
											onClick={() => updatePicConfirm('deleteProfile')}
										>
											<AiOutlineDelete />
										</div>
									)}
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
							<div
								className={`${classes.box} ${
									followed ? classes.unfollow : classes.follow
								}`}
								onClick={followUser}
							>
								<span>{followed ? <AiOutlineMinus /> : <AiOutlinePlus />}</span>
								<p>{followed ? 'Following' : 'Follow'}</p>
							</div>
						) : (
							<Link to={'/settings'}>
								<div className={`${classes.box} ${classes.editProfile}`}>
									<span>
										<FaUserEdit />
									</span>
								</div>
							</Link>
						)}
					</div>
				</div>
				<div className={classes.postsInfo}>
					<div className={classes.info}>
						<h2>Info</h2>
						<p>{user?.bio}</p>

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
									postDeleted={postDeleted}
									postUpdated={postUpdated}
								/>
							))}
					</div>
				</div>
			</main>
		</Fragment>
	);
};

export default Profile;
