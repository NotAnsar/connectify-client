import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeRequest } from '../../axios';
import classes from './Home.module.scss';
import { FiRss } from 'react-icons/fi';

import Post from './Post';

import Alert from '../utils/Alert';
import RightNav from './RightNav';

const Feed = () => {
	const { token, user: me } = useSelector((state) => state.auth);
	const [posts, setPosts] = useState('');
	const [alert, setalert] = useState(false);

	useEffect(() => {
		getPosts();
		return () => {
			setPosts('');
		};
	}, []);

	async function getPosts() {
		try {
			const res = await makeRequest.get('posts/saved', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			setPosts(res.data.posts);
		} catch (error) {
			console.log(error);
			setPosts(null);
		}
	}

	function postDeleted() {
		getPosts();
		setalert('Post Deleted');
	}

	function postUpdated() {
		getPosts();
		setalert('Post Updated');
	}

	return (
		<Fragment>
			{alert && (
				<Alert
					msg={alert}
					setAlert={setalert}
					color={alert.split(' ')[1] === 'Deleted' ? 'red' : ''}
				/>
			)}
			<section className={classes.middle}>
				<div className={classes.savedPost}>
					<h1>Feed</h1>
					<FiRss style={{ fill: 'none' }} />
				</div>
				{posts === '' ? (
					<h1>Loading</h1>
				) : (
					posts.length === 0 && <p>{"You haven't saved Any posts"}</p>
				)}

				{posts.length > 0 &&
					posts &&
					posts.map((p, key) => (
						<Post
							post={p}
							key={key}
							me={p.user_id === me.id}
							postDeleted={postDeleted}
							postUpdated={postUpdated}
						/>
					))}
			</section>
			<RightNav />
		</Fragment>
	);
};

export default Feed;
