import classes from './Home.module.scss';
import Suggestion from '../utils/Suggestion/Suggestion';
import FirendsAvailability from '../utils/FirendsAvailability/FirendsAvailability';

const RightNav = () => {
	return (
		<article className={classes.right}>
			<Suggestion />
			<FirendsAvailability />
		</article>
	);
};

export default RightNav;
