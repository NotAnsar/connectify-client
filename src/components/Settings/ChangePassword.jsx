import { useState } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import validator from 'validator';
import formClasses from '../Auth/Login.module.scss';
import classes from './Settings.module.scss';

const ChangePassword = () => {
	const [visibble, setvisibble] = useState(false);

	const [error, setError] = useState(null);
	const [formData, setFormData] = useState({
		password: '',
		oldPassword: '',
	});
	const [formValid, setFormValid] = useState({
		password: true,
		oldPassword: true,
	});

	const formHandler = async (e) => {
		e.preventDefault();
	};

	const handleChange = (e) => {
		let value = e.target.value;
		let name = e.target.name;

		if (name === 'password' || name === 'oldPassword') {
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
		<div className={classes.editProfileWrapper}>
			<form onSubmit={formHandler}>
				<div
					className={`${formClasses.inputContainer} ${
						formValid.oldPassword ? '' : formClasses.error
					}`}
				>
					<input
						type={visibble ? 'text' : 'password'}
						required
						name='oldPassword'
						onChange={handleChange}
					/>
					<label>Old Password</label>
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
						formValid.password ? '' : formClasses.error
					}`}
				>
					<input
						type={visibble ? 'text' : 'password'}
						required
						name='paassword'
						onChange={handleChange}
					/>
					<label>New Password</label>
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
					className={classes.updateBtn}
					type='submit'
					value='Change Password'
				/>
			</form>
		</div>
	);
};

export default ChangePassword;
