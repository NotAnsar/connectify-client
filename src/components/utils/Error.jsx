import { BiErrorCircle } from 'react-icons/bi';
import classes from './Layout.module.scss';

const Error = ({ msg, setAlert }) => {
	return (
		<div className={classes.alert} onClick={() => setAlert(false)}>
			<BiErrorCircle /> <span>{msg}</span>
		</div>
	);
};

export default Error;
