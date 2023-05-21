import { FiMoon, FiSun } from 'react-icons/fi';
import { toggle } from '../../store/themeSlice';
import { useDispatch, useSelector } from 'react-redux';
import classes from './Login.module.scss';

const ThemeToggler = () => {
	const theme = useSelector((state) => state.theme);
	const dispatch = useDispatch((state) => state.theme);

	return (
		<div className={classes.themeToggler} onClick={() => dispatch(toggle())}>
			{theme === 'dark' ? <FiMoon /> : <FiSun />}
		</div>
	);
};

export default ThemeToggler;
