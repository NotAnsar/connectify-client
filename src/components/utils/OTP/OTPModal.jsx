import { Fragment, useState } from 'react';
import classes from './../Comment/Comment.module.scss';
import { CgClose } from 'react-icons/cg';
import formClasses from '../../Auth/Login.module.scss';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import validator from 'validator';

const OTPModal = ({ showOTP, otpCode, setError, registerUser }) => {
	const [otp, setotp] = useState('');
	const [otPValidity, setOtPValidity] = useState(true);

	function validateInput(input) {
		return (
			validator.isNumeric(input) &&
			validator.isLength(input, { min: 4, max: 4 })
		);
	}

	function formHandler(e) {
		e.preventDefault();
		if (!otPValidity) return;
		if (otp === otpCode) {
			registerUser();
		} else {
			setError('Incorrect OTP! Try Again.');
		}
	}
	return (
		<Fragment>
			<div className={classes.bg} onClick={() => showOTP(false)}></div>
			<div className={classes.otpBox}>
				<div className={classes.title}>
					<h4>Email Verification</h4>
					<CgClose onClick={() => showOTP(false)} />
				</div>
				<div className={classes.modal} style={{ marginTop: '1rem' }}>
					<form onSubmit={formHandler} id='otpform'>
						<div
							className={`${formClasses.inputContainer} ${
								otPValidity ? '' : formClasses.error
							}`}
							style={{ marginBottom: '.5rem' }}
							defaultValue={otp}
							onChange={(e) => {
								setotp(e.target.value);
								setOtPValidity(validateInput(e.target.value));
							}}
						>
							<input
								type='text'
								required
								name='otp'
								// onChange={handleChange}
								// value={formData.email}
							/>
							<label>Enter OTP</label>
							<div className={formClasses.info}>
								<AiOutlineInfoCircle />
							</div>
							<span className={formClasses.msg}>Enter Valid OTP Code</span>
						</div>
						<span className={formClasses.note}>
							We send OTP to your email address. Please check your inbox.
						</span>
					</form>
				</div>
				<form className={classes.addComment} /* onSubmit={addComment} */>
					<input type='submit' form='otpform' value='Verify' />
				</form>
			</div>
		</Fragment>
	);
};

export default OTPModal;
