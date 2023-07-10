import { Link, useNavigate } from 'react-router-dom';
import classes from './Login.module.scss';

import { AiOutlineInfoCircle } from 'react-icons/ai';
import validator from 'validator';
import { Fragment, useEffect, useState } from 'react';
import ThemeToggler from './ThemeToggler';
import Error from '../utils/Error';
import { makeRequest } from '../../axios';

import { BiArrowBack } from 'react-icons/bi';
import OTPModal from '../utils/OTP/OTPModal';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';

const Forgotpassword = () => {
	const [visibble, setvisibble] = useState(false);

	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: '',
		newpassword: '',
		confirmnewpassword: '',
	});
	const [passwordVisible, showPassword] = useState(false);
	const [formValid, setFormValid] = useState({
		email: true,
		newpassword: true,
		confirmnewpassword: true,
	});
	const [error, setError] = useState(null);
	const [otp, showOTP] = useState(false);
	const [otpCode, setOtpCode] = useState(null);

	useEffect(() => {
		document.body.style.overflow = otp && otpCode ? 'hidden' : 'unset';
	}, [otp, otpCode]);

	function OTPDone() {
		showPassword(true);
		showOTP(false);
	}
	const formHandler = async (e) => {
		e.preventDefault();

		if (
			Object.values(formValid).every(Boolean) &&
			formData.newpassword === '' &&
			formData.confirmnewpassword === ''
		) {
			sendOTP(formData.email);
		}
		if (
			Object.values(formValid).every(Boolean) &&
			formData.newpassword !== '' &&
			formData.confirmnewpassword !== ''
		) {
			if (formData.newpassword === formData.confirmnewpassword) {
				resetPassword(formData.email, formData.newpassword);
			} else {
				setError('Not the Same Password');
			}
		}
	};
	async function sendOTP(email) {
		try {
			const data = await makeRequest.post('/auth/sendOTP', {
				email,
				register: false,
			});

			setOtpCode(data.data.otp);

			showOTP(true);
		} catch (error) {
			console.log(error);
			setError(error.response.data.message);
		}
	}

	async function resetPassword(email, newPassword) {
		try {
			const data = await makeRequest.post('/auth/resetPassword', {
				email,
				newPassword,
			});
			console.log(data.data);
			navigate('/', {
				state: { alertMsg: 'Password Reset Successful. Log in now.' },
			});
		} catch (error) {
			console.log(error);
			setError(error.response.data.message);
		}
	}

	const handleChange = (e) => {
		let value = e.target.value;
		let name = e.target.name;

		setFormData((prev) => ({ ...prev, [name]: value }));
		if (name === 'email') {
			setFormValid((prev) => ({ ...prev, email: validator.isEmail(value) }));
		}
		if (name === 'newpassword' || name === 'confirmnewpassword') {
			setFormValid((prev) => ({
				...prev,
				[name]: validator.isStrongPassword(value, {
					minLength: 8,
					minLowercase: 1,
					minNumbers: 1,
					minSymbols: 1,
					minUppercase: 0,
				}),
			}));
		}
	};

	return (
		<Fragment>
			{otp && otpCode && (
				<OTPModal
					registerUser={OTPDone}
					setError={setError}
					showOTP={showOTP}
					otpCode={otpCode}
				/>
			)}

			<div className={classes.login}>
				{error && <Error msg={error} setAlert={setError} />}
				<ThemeToggler />

				<h1>Connectify</h1>
				<h2>Hello Again!</h2>
				<p>Reset Your Password</p>
				<form onSubmit={formHandler}>
					{!passwordVisible && (
						<div
							className={`${classes.inputContainer} ${
								formValid.email ? '' : classes.error
							}`}
						>
							<input
								type='text'
								required
								onChange={handleChange}
								name='email'
							/>
							<label>Email Address</label>
							<div className={classes.info}>
								<AiOutlineInfoCircle />
							</div>
							<span className={classes.msg}>Enter Valid Email</span>
						</div>
					)}

					{passwordVisible && (
						<>
							<div
								className={`${classes.inputContainer} ${
									formValid.newpassword ? '' : classes.error
								}`}
							>
								<input
									type={visibble ? 'text' : 'password'}
									required
									onChange={handleChange}
									name='newpassword'
								/>
								<label>New Password</label>
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
							<div
								className={`${classes.inputContainer} ${
									formValid.confirmnewpassword ? '' : classes.error
								}`}
							>
								<input
									type={visibble ? 'text' : 'password'}
									required
									onChange={handleChange}
									name='confirmnewpassword'
								/>
								<label>Confirm New Password</label>
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
						</>
					)}

					<input type='submit' value='Reset Password' />
				</form>
				<Link to='/Login'>
					<p className={`${classes.switchLog} ${classes.resetContainer}`}>
						<BiArrowBack /> Back to
						<span>Login</span>
					</p>
				</Link>
			</div>
		</Fragment>
	);
};

export default Forgotpassword;
