import { Fragment, useEffect, useState } from 'react';

import CreatePostCard from './CreatePostCard';
import Post from './Post';
import classes from './Home.module.scss';
import ProfileCard from './ProfileCard';

import { makeRequest } from '../../axios';
import { useSelector } from 'react-redux';
import Alert from '../utils/Alert';

const Explore = () => {
	const { user: me } = useSelector((state) => state.auth);
	const [posts, setPosts] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [alert, setalert] = useState(false);

	useEffect(() => {
		getPosts();

		return () => {
			setPosts('');
			setIsLoading(true);
		};
	}, []);

	async function getPosts() {
		try {
			const res = await makeRequest.get('posts/feed');

			setPosts(res.data.posts);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
			setPosts(null);
			setIsLoading(false);
		}
	}

	async function addNewPost(content, file) {
		console.log(content, file);
		let img = null;
		if (file) {
			const data = new FormData();
			const fileName = Date.now() + file.name;
			data.append('name', fileName);
			data.append('file', file);

			try {
				const res = await makeRequest.post('/upload', data);
				console.log(res.data);
				img = res.data.filename;
			} catch (err) {
				console.log(err);
			}
		}

		addPost();
		async function addPost() {
			try {
				const res = await makeRequest.post('posts', {
					description: content,
					img,
				});

				console.log(res.data.post);
				setalert('Post Published');
				getPosts();
			} catch (error) {
				console.log(error);
			}
		}
	}

	function postDeleted() {
		getPosts();
		setalert('Post Deleted');
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
				<CreatePostCard addNewPost={addNewPost} />
				{isLoading ? (
					<h1>Loading</h1>
				) : (
					posts.map((p) => (
						<Post
							post={p}
							key={p.id}
							me={p.user_id === me.id}
							friend={p.user_id !== me.id}
							getPosts={postDeleted}
						/>
					))
				)}
			</section>
			<article className={classes.right}>
				<ProfileCard />
			</article>
		</Fragment>
	);
};

export default Explore;
