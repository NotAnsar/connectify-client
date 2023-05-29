import classes from './Suggestion.module.scss';
import Card from '../Card';
import SuggestedUser from './SuggestedUser';
import { useEffect, useState } from 'react';
import { makeRequest } from '../../../axios';

const Suggestion = () => {
	const [suggestedUser, setSuggestedUser] = useState([]);
	useEffect(() => {
		getSuggestedUser();
	}, []);

	async function getSuggestedUser() {
		try {
			const res = await makeRequest.get('users/suggested');
			// console.log(res.data);
			setSuggestedUser(res.data.users);
		} catch (error) {
			setSuggestedUser(null);
			console.log(error);
		}
	}
	return (
		<Card>
			<div className={classes.suggestion}>
				<p>Suggested for you</p>

				<div className={classes.users}>
					{suggestedUser.map((s) => (
						<SuggestedUser user={s} key={s.id} />
					))}
				</div>
			</div>
		</Card>
	);
};

export default Suggestion;
