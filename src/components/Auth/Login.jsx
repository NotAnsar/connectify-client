import { Link, useLocation } from 'react-router-dom';
import classes from './Login.module.scss';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import validator from 'validator';
import { Fragment, useEffect, useState } from 'react';
import ThemeToggler from './ThemeToggler';
import Error from '../utils/Error';
import { makeRequest } from '../../axios';
import { useDispatch } from 'react-redux';
import { login } from '../../store/auth';
import Alert from '../utils/Alert';

const Login = () => {
	const [visibble, setvisibble] = useState(false);
	const [formData, setFormData] = useState({ email: '', password: '' });
	const [formValid, setFormValid] = useState({ email: true, password: true });
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const [alert, setalert] = useState(false);

	const location = useLocation();

	const alertMsg = location.state && location.state.alertMsg;

	useEffect(() => {
		if (alertMsg) setalert(alertMsg);
	}, [alertMsg]);

	const formHandler = async (e) => {
		e.preventDefault();

		if (Object.values(formValid).every(Boolean)) {
			try {
				const data = await makeRequest.post('/auth/login', formData);
				dispatch(login(data.data));
			} catch (error) {
				console.log(error);
				setError(
					error?.response?.data?.message
						? error.response.data.message
						: error.message
				);
			}
		}
	};

	const handleChange = (e) => {
		let value = e.target.value;
		let name = e.target.name;
		setFormData((prev) => ({ ...prev, [name]: value }));
		if (name === 'email') {
			setFormValid((prev) => ({ ...prev, email: validator.isEmail(value) }));
		}
		if (name === 'password') {
			setFormValid((prev) => ({
				...prev,
				password: validator.isStrongPassword(value, {
					minLength: 8,
					minLowercase: 1,
					minUppercase: 0,
					minNumbers: 1,
					minSymbols: 1,
				}),
			}));
		}
	};
	return (
		<Fragment>
			{alert && <Alert msg={alert} setAlert={setalert} />}
			<div className={classes.login}>
				{error && <Error msg={error} setAlert={setError} />}
				<ThemeToggler />

				<h1>Connectify</h1>
				<h2>Hello Again!</h2>
				<p>Sign in to your account</p>
				<form onSubmit={formHandler}>
					<div
						className={`${classes.inputContainer} ${
							formValid.email ? '' : classes.error
						}`}
					>
						<input type='text' required onChange={handleChange} name='email' />
						<label>Email Address</label>
						<div className={classes.info}>
							<AiOutlineInfoCircle />
						</div>
						<span className={classes.msg}>Enter Valid Email</span>
					</div>
					<div
						className={`${classes.inputContainer} ${
							formValid.password ? '' : classes.error
						}`}
					>
						<input
							type={visibble ? 'text' : 'password'}
							required
							onChange={handleChange}
							name='password'
						/>
						<label>Password</label>
						<span
							onClick={() => setvisibble((a) => !a)}
							className={classes.passwordIcon}
						>
							{visibble ? <VscEye /> : <VscEyeClosed />}
						</span>
						<div className={classes.info}>
							<AiOutlineInfoCircle />
						</div>

						<span className={classes.msg}>
							password must be at least 8 characters long with 1 lowercase 1
							number and 1 symbol
						</span>
					</div>
					<Link to={'/forgotpassword'}>
						<span className={classes.forgotPass}>Forgot your password?</span>
					</Link>
					<input type='submit' value='Login' />
				</form>
				<p className={classes.switchLog}>
					Don’t have account? Let’s
					<Link to='/register'>
						<span>Sign up</span>
					</Link>
				</p>
			</div>
		</Fragment>
	);
};

export default Login;
