import { Fragment, useEffect, useState } from 'react';

import CreatePostCard from './CreatePostCard';
import Post from './Post';
import classes from './Home.module.scss';
import ProfileCard from './ProfileCard';
import { Link } from 'react-router-dom';
import { makeRequest } from '../../axios';
import { useSelector } from 'react-redux';

const Explore = () => {
	const { token, user: me } = useSelector((state) => state.auth);
	const [posts, setPosts] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getPosts();

		async function getPosts() {
			try {
				const res = await makeRequest.get('posts/feed');
				// const res = await makeRequest.get('posts/feed', {
				// headers: {
				// 	Authorization: `Bearer ${token}`,
				// },
				// });

				setPosts(res.data.posts);
				setIsLoading(false);
			} catch (error) {
				console.log(error);
				setPosts(null);
				setIsLoading(false);
			}
		}
	}, [token]);
	return (
		<Fragment>
			<section className={classes.middle}>
				<CreatePostCard />
				{isLoading ? (
					<h1>Loading</h1>
				) : (
					posts.map((p) => (
						<Post
							post={p}
							key={p.id}
							me={p.user_id === me.id}
							friend={p.user_id !== me.id}
						/>
					))
				)}
			</section>
			<article className={classes.right}>
				<Link to='/profile'>
					<ProfileCard />
				</Link>
			</article>
		</Fragment>
	);
};

export default Explore;
