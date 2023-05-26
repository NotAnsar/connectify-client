import { Fragment, useState } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import validator from 'validator';
import formClasses from '../Auth/Login.module.scss';
import classes from './Settings.module.scss';
import { useDispatch } from 'react-redux';
import { makeRequest } from '../../axios';
import { logout } from '../../store/auth';
import Error from '../utils/Error';

const DeleteAccount = () => {
	const [visibble, setvisibble] = useState(false);
	const dispatch = useDispatch();
	const [error, setError] = useState(null);
	const [formData, setFormData] = useState({
		password: '',
		confirmPassword: '',
	});
	const [formValid, setFormValid] = useState({
		password: true,
		confirmPassword: true,
	});

	const formHandler = async (e) => {
		e.preventDefault();

		if (formData.password !== formData.confirmPassword) {
			setError('Not The same Password');
			return;
		}
		if (Object.values(formValid).every(Boolean)) {
			try {
				await makeRequest.delete('users', {
					data: { password: formData.password },
				});
				dispatch(logout());
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
	};

	return (
		<Fragment>
			{error && <Error msg={error} setAlert={setError} />}
			<div className={classes.editProfileWrapper}>
				<form onSubmit={formHandler}>
					<div
						className={`${formClasses.inputContainer} ${
							formValid.password ? '' : formClasses.error
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
							className={formClasses.passwordIcon}
						>
							{visibble ? <VscEye /> : <VscEyeClosed />}
						</span>
						<div className={formClasses.info}>
							<AiOutlineInfoCircle />
						</div>
						<span className={formClasses.msg}>
							password must be at least 8 characters long with 1 lowercase 1
							number and 1 symbol
						</span>
					</div>
					<div
						className={`${formClasses.inputContainer} ${
							formValid.confirmPassword ? '' : formClasses.error
						}`}
					>
						<input
							type={visibble ? 'text' : 'password'}
							required
							name='confirmPassword'
							onChange={handleChange}
						/>
						<label>Confirm Password</label>
						<span
							onClick={() => setvisibble((a) => !a)}
							className={formClasses.passwordIcon}
						>
							{visibble ? <VscEye /> : <VscEyeClosed />}
						</span>
						<div className={formClasses.info}>
							<AiOutlineInfoCircle />
						</div>
						<span className={formClasses.msg}>
							password must be at least 8 characters long with 1 lowercase 1
							number and 1 symbol
						</span>
					</div>

					<input
						className={classes.deleteBtn}
						type='submit'
						value='Delete Account'
					/>
				</form>
			</div>
		</Fragment>
	);
};

export default DeleteAccount;
