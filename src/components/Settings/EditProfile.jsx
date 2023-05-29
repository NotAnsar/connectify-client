import { Fragment, useState } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import validator from 'validator';
import formClasses from '../Auth/Login.module.scss';
import classes from './Settings.module.scss';
import { makeRequest } from '../../axios';
import Error from '../utils/Error';
import { useDispatch, useSelector } from 'react-redux';
import { setMyUser } from '../../store/auth';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
	const { user } = useSelector((state) => state.auth);

	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		prenom: user.prenom,
		nom: user.nom,
		email: user.email,
		bio: user.bio ? user.bio : '',
		username: user.username,
		city: user.city,
		country: user.country,
		relationship: user.relationship,
	});
	console.log(user);
	const [formValid, setFormValid] = useState({
		prenom: true,
		nom: true,
		email: true,

		username: true,
		city: true,
		country: true,
		relationship: true,
	});

	const formHandler = async (e) => {
		e.preventDefault();
		console.log('updating');
		console.log(formValid);
		if (Object.values(formValid).every(Boolean)) {
			try {
				const res = await makeRequest.patch('users', formData);
				console.log(res.data.user);
				dispatch(setMyUser(res.data));

				navigate('/profile/' + user.id, {
					state: { alertMsg: 'Your Profile have been Updated' },
				});
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
		<Fragment>
			{error && <Error msg={error} setAlert={setError} />}
			<div className={classes.editProfileWrapper}>
				<form onSubmit={formHandler}>
					<div className={formClasses.splitBy2}>
						<div
							className={`${formClasses.inputContainer} ${
								formValid.prenom ? '' : formClasses.error
							}`}
						>
							<input
								type='text'
								required
								name='prenom'
								onChange={handleChange}
								value={formData.prenom}
							/>
							<label>First Name</label>
							<div className={formClasses.info}>
								<AiOutlineInfoCircle />
							</div>
							<span className={formClasses.msg}>
								First Name cannot be shorter than 3 characters. Please use
								letters only.
							</span>
						</div>
						<div
							className={`${formClasses.inputContainer} ${
								formValid.nom ? '' : formClasses.error
							}`}
						>
							<input
								type='text'
								required
								name='nom'
								onChange={handleChange}
								value={formData.nom}
							/>
							<label>Last Name</label>
							<div className={formClasses.info}>
								<AiOutlineInfoCircle />
							</div>
							<span className={formClasses.msg}>
								Last Name cannot be shorter than 3 characters. Please use
								letters only.
							</span>
						</div>
					</div>
					<div className={formClasses.splitBy2}>
						<div
							className={`${formClasses.inputContainer} ${
								formValid.username ? '' : formClasses.error
							}`}
						>
							<input
								type='text'
								required
								name='username'
								onChange={handleChange}
								value={formData.username}
							/>
							<label>Userame</label>
							<div className={formClasses.info}>
								<AiOutlineInfoCircle />
							</div>
							<span className={formClasses.msg}>
								Username cannot be shorter than 3 characters
							</span>
						</div>

						<div
							className={`${formClasses.inputRadioContainer} ${
								classes.secondaryColor
							} ${formValid.relationship ? '' : formClasses.error}`}
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
										checked={formData.relationship === 'Single'}
									/>
									<span>Single</span>
								</li>
								<li>
									<input
										type='radio'
										name='relationship'
										onChange={handleChange}
										value='In a Relationship'
										checked={formData.relationship === 'In a Relationship'}
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
							<div className={formClasses.info}>
								<AiOutlineInfoCircle />
							</div>
						</div>
					</div>

					<div className={formClasses.splitBy2}>
						<div
							className={`${formClasses.inputContainer} ${
								formValid.city ? '' : formClasses.error
							}`}
						>
							<input
								type='text'
								required
								name='city'
								onChange={handleChange}
								value={formData.city}
							/>
							<label>City</label>
							<div className={formClasses.info}>
								<AiOutlineInfoCircle />
							</div>
							<span className={formClasses.msg}>
								City cannot be shorter than 3 characters. Please use letters
								only.
							</span>
						</div>
						<div
							className={`${formClasses.inputContainer} ${
								formValid.country ? '' : formClasses.error
							}`}
						>
							<input
								type='text'
								required
								name='country'
								onChange={handleChange}
								value={formData.country}
							/>
							<label>Country</label>
							<div className={formClasses.info}>
								<AiOutlineInfoCircle />
							</div>
							<span className={formClasses.msg}>
								Country cannot be shorter than 3 characters. Please use letters
								only.
							</span>
						</div>
					</div>

					<div
						className={`${formClasses.inputContainer} ${
							formValid.email ? '' : formClasses.error
						}`}
					>
						<input
							type='text'
							required
							name='email'
							onChange={handleChange}
							value={formData.email}
						/>
						<label>Email Address</label>
						<div className={formClasses.info}>
							<AiOutlineInfoCircle />
						</div>
						<span className={formClasses.msg}>Enter Valid Email</span>
					</div>

					<div className={`${formClasses.inputContainer}`}>
						<input
							type='text'
							name='bio'
							onChange={handleChange}
							value={formData.bio || ''}
						/>
						<label>Bio</label>
						<div className={formClasses.info}>
							<AiOutlineInfoCircle />
						</div>
						<span className={formClasses.msg}>
							City cannot be shorter than 3 characters. Please use letters only.
						</span>
					</div>

					<input className={classes.updateBtn} type='submit' value='Update' />
				</form>
			</div>
		</Fragment>
	);
};

export default EditProfile;
