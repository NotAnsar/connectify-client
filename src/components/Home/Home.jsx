import { Fragment } from 'react';
import Navbar from '../Navbar/Navbar';
import classes from './Home.module.scss';
import Layout from '../utils/Layout';
import LeftNav from './LeftNav';
import { Navigate, Route, Routes } from 'react-router-dom';
import Explore from './Explore';
import SavedPosts from './SavedPosts';
import ProfileCard from './ProfileCard';
import Settings from '../Settings/Settings';
import Conversation from '../Conversation/Conversation';
import Feed from './Feed';

const Home = () => {
	return (
		<Fragment>
			<Navbar />

			<Layout>
				<main className={classes.home} style={{ marginTop: '2rem' }}>
					<aside className={classes.left}>
						<ProfileCard />

						<LeftNav />
					</aside>
					<Routes>
						<Route path='' element={<Explore />} />
						<Route path='settings/*' element={<Settings />} />
						<Route path='messages' element={<Conversation />} />
						<Route path='savedPosts' element={<SavedPosts />} />
						<Route path='feed' element={<Feed />} />
						{<Route path='*' element={<Navigate to='/' />} />}
					</Routes>
				</main>
			</Layout>
		</Fragment>
	);
};

export default Home;
