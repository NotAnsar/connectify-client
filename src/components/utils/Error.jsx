import { BiErrorCircle } from 'react-icons/bi';
import classes from './Layout.module.scss';
import { useEffect } from 'react';

const Error = ({ msg, setAlert }) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			setAlert(false);
		}, 3000);

		return () => clearTimeout(timer);
	}, [setAlert]);

	return (
		<div className={classes.alert} onClick={() => setAlert(false)}>
			<BiErrorCircle /> <span>{msg}</span>
		</div>
	);
};

export default Error;
