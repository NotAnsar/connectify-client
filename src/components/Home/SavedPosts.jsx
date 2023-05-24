import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeRequest } from '../../axios';
import classes from './Home.module.scss';
import { FiBookmark } from 'react-icons/fi';

import Post from './Post';
import ProfileCard from './ProfileCard';

const SavedPosts = () => {
	const { token, user: me } = useSelector((state) => state.auth);
	const [posts, setPosts] = useState('');

	useEffect(() => {
		getPosts();

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
	}, [token]);

	return (
		<Fragment>
			<section className={classes.middle}>
				<div className={classes.savedPost}>
					<h1>My Saved Posts</h1>
					<FiBookmark />
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
							posts={posts}
							post={p}
							key={key}
							me={p.user_id === me.id}
							friend={p.user_id !== me.id}
						/>
					))}
			</section>
			<article className={classes.right}>
				<ProfileCard />
			</article>
		</Fragment>
	);
};

export default SavedPosts;
