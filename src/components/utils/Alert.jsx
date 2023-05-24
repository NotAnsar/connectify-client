import { BiErrorCircle } from 'react-icons/bi';
import classes from './Layout.module.scss';
import { useEffect } from 'react';

const Alert = ({ msg, setAlert, color }) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			setAlert(false);
		}, 3000);

		return () => clearTimeout(timer);
	}, [setAlert]);

	return (
		<div
			className={`${classes.alert} ${color !== 'red' && classes.alertInfo}`}
			onClick={() => setAlert(false)}
		>
			<BiErrorCircle /> <span>{msg}</span>
		</div>
	);
};

export default Alert;
