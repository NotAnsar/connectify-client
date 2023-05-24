import { useState } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import validator from 'validator';
import formClasses from '../Auth/Login.module.scss';
import classes from './Settings.module.scss';

const EditProfile = () => {
	const [error, setError] = useState(null);
	const [formData, setFormData] = useState({
		prenom: '',
		nom: '',
		email: '',
		bio: '',
		username: '',
		city: '',
		country: '',
		relationship: '',
	});
	const [formValid, setFormValid] = useState({
		prenom: true,
		nom: true,
		email: true,
		bio: true,
		username: true,
		city: true,
		country: true,
		relationship: true,
	});

	const formHandler = async (e) => {
		e.preventDefault();
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
		if (
			name === 'username' ||
			name === 'city' ||
			name === 'country' ||
			name === 'bio'
		) {
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
		<div className={classes.editProfileWrapper}>
			<form onSubmit={formHandler}>
				<div className={formClasses.splitBy2}>
					<div
						className={`${formClasses.inputContainer} ${
							formValid.prenom ? '' : formClasses.error
						}`}
					>
						<input type='text' required name='prenom' onChange={handleChange} />
						<label>First Name</label>
						<div className={formClasses.info}>
							<AiOutlineInfoCircle />
						</div>
						<span className={formClasses.msg}>
							First Name cannot be shorter than 3 characters. Please use letters
							only.
						</span>
					</div>
					<div
						className={`${formClasses.inputContainer} ${
							formValid.nom ? '' : formClasses.error
						}`}
					>
						<input type='text' required name='nom' onChange={handleChange} />
						<label>Last Name</label>
						<div className={formClasses.info}>
							<AiOutlineInfoCircle />
						</div>
						<span className={formClasses.msg}>
							Last Name cannot be shorter than 3 characters. Please use letters
							only.
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
						<input type='text' required name='city' onChange={handleChange} />
						<label>City</label>
						<div className={formClasses.info}>
							<AiOutlineInfoCircle />
						</div>
						<span className={formClasses.msg}>
							City cannot be shorter than 3 characters. Please use letters only.
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
					<input type='text' required name='email' onChange={handleChange} />
					<label>Email Address</label>
					<div className={formClasses.info}>
						<AiOutlineInfoCircle />
					</div>
					<span className={formClasses.msg}>Enter Valid Email</span>
				</div>

				<div
					className={`${formClasses.inputContainer} ${
						formValid.email ? '' : formClasses.error
					}`}
				>
					<input type='text' required name='bio' onChange={handleChange} />
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
	);
};

export default EditProfile;
