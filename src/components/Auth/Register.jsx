import { Link } from 'react-router-dom';
import classes from './Login.module.scss';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import { useState } from 'react';
import ThemeToggler from './ThemeToggler';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import validator from 'validator';
import { makeRequest } from '../../axios';
import { register } from '../../store/auth';
import { useDispatch } from 'react-redux';
import Error from '../utils/Error';

const Register = () => {
	const [visibble, setvisibble] = useState(false);
	const dispatch = useDispatch();
	const [error, setError] = useState(null);
	const [formData, setFormData] = useState({
		prenom: '',
		nom: '',
		email: '',
		password: '',
		username: '',
		city: '',
		country: '',
		relationship: '',
	});
	const [formValid, setFormValid] = useState({
		prenom: true,
		nom: true,
		email: true,
		password: true,
		username: true,
		city: true,
		country: true,
		relationship: true,
	});

	const formHandler = async (e) => {
		e.preventDefault();

		if (Object.values(formValid).every(Boolean)) {
			try {
				const data = await makeRequest.post('/auth/register', formData);

				dispatch(register(data.data));
			} catch (error) {
				console.log(error);
				setError(error.response.data.message);
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
					minNumbers: 1,
					minSymbols: 1,
					minUppercase: 0,
				}),
			}));
		}
		if (name === 'relationship') {
			setFormValid((prev) => ({
				...prev,
				relationship: ['Single', 'In a Relationship'].includes(value),
			}));
		}
		if (name === 'username' || name === 'city' || name === 'country') {
			setFormValid((prev) => ({
				...prev,
				[name]: value.length >= 3,
			}));
		}
		if (name === 'prenom' || name === 'nom') {
			setFormValid((prev) => ({
				...prev,
				[name]: validator.isAlpha(value) && value.length >= 3,
			}));
		}
	};

	return (
		<div className={`${classes.login} ${classes.signup}`}>
			{error && <Error msg={error} setAlert={setError} />}
			<ThemeToggler />
			<h1>Connectify</h1>
			<h2>Hello Again!</h2>
			<p>Sign in to your account</p>
			<form onSubmit={formHandler}>
				<div className={classes.splitBy2}>
					<div
						className={`${classes.inputContainer} ${
							formValid.prenom ? '' : classes.error
						}`}
					>
						<input type='text' required name='prenom' onChange={handleChange} />
						<label>First Name</label>
						<div className={classes.info}>
							<AiOutlineInfoCircle />
						</div>
						<span className={classes.msg}>
							First Name cannot be shorter than 3 characters. Please use letters
							only.
						</span>
					</div>
					<div
						className={`${classes.inputContainer} ${
							formValid.nom ? '' : classes.error
						}`}
					>
						<input type='text' required name='nom' onChange={handleChange} />
						<label>Last Name</label>
						<div className={classes.info}>
							<AiOutlineInfoCircle />
						</div>
						<span className={classes.msg}>
							Last Name cannot be shorter than 3 characters. Please use letters
							only.
						</span>
					</div>
				</div>
				<div className={classes.splitBy2}>
					<div
						className={`${classes.inputContainer} ${
							formValid.username ? '' : classes.error
						}`}
					>
						<input
							type='text'
							required
							name='username'
							onChange={handleChange}
						/>
						<label>Userame</label>
						<div className={classes.info}>
							<AiOutlineInfoCircle />
						</div>
						<span className={classes.msg}>
							Username cannot be shorter than 3 characters
						</span>
					</div>

					<div
						className={`${classes.inputRadioContainer} ${
							formValid.relationship ? '' : classes.error
						}`}
						style={{
							border: !formValid.relationship && 'solid 1px var(--error)',
						}}
					>
						<ul>
							<li>
								<input
									type='radio'
									name='relationship'
									value='Single'
									required
									onChange={handleChange}
								/>
								<span>Single</span>
							</li>
							<li>
								<input
									type='radio'
									name='relationship'
									onChange={handleChange}
									value='In a Relationship'
									required
								/>
								<span>In a Relationship</span>
							</li>
						</ul>

						<label
							style={{
								color: !formValid.relationship && 'var(--error)',
							}}
						>
							Relationship Status
						</label>
						<div className={classes.info}>
							<AiOutlineInfoCircle />
						</div>
					</div>
				</div>

				<div className={classes.splitBy2}>
					<div
						className={`${classes.inputContainer} ${
							formValid.city ? '' : classes.error
						}`}
					>
						<input type='text' required name='city' onChange={handleChange} />
						<label>City</label>
						<div className={classes.info}>
							<AiOutlineInfoCircle />
						</div>
						<span className={classes.msg}>
							City cannot be shorter than 3 characters. Please use letters only.
						</span>
					</div>
					<div
						className={`${classes.inputContainer} ${
							formValid.country ? '' : classes.error
						}`}
					>
						<input
							type='text'
							required
							name='country'
							onChange={handleChange}
						/>
						<label>Country</label>
						<div className={classes.info}>
							<AiOutlineInfoCircle />
						</div>
						<span className={classes.msg}>
							Country cannot be shorter than 3 characters. Please use letters
							only.
						</span>
					</div>
				</div>

				<div
					className={`${classes.inputContainer} ${
						formValid.email ? '' : classes.error
					}`}
				>
					<input type='text' required name='email' onChange={handleChange} />
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
						name='password'
						onChange={handleChange}
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

				<input type='submit' value='Sign up' />
			</form>
			<p className={classes.switchLog}>
				Already have an account? Let’s
				<Link to='/'>
					<span>Login</span>
				</Link>
			</p>
		</div>
	);
};

export default Register;
