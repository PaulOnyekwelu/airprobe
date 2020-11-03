import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import useUnsavedWarning from "../hooks/useUnsavedWarning";

const Register = () => {
	const RegisterForm = {
		username: "",
		firstName: "",
		lastName: "",
		password: "",
		repeatPassword: "",
	};
	const [formData, setFormData] = useState(RegisterForm);
	const [passwordVisibility, togglePasswordVisibility] = useState(false);
	const [invalidPasswordFormat, setInvalidPasswordFormat] = useState(false);
	const [invalidRepeatPassword, setInvalidRepeatPassword] = useState(false);
	const [passwordStrength, setPasswordStrength] = useState(null);
	const [unSavedPrompt, isDirty, isPristine] = useUnsavedWarning();
	const { firstName, lastName, username, password, repeatPassword } = formData;

	const passwordValidation = e => {
		let userPassword = e ? e.target.value : password;
		const checkCapital = userPassword.match(/[A-Z]/) !== null;
		const checkDigits = userPassword.match(/[0-9]/) !== null;
		const checkSpecialChars = userPassword.match(/[!@#$%^&*?]/) !== null;
		const checkLength = userPassword.length > 7;

		// setting password indicator
		if (userPassword.length === 0) setPasswordStrength(null);
		if (userPassword.length > 0) setPasswordStrength("weak");
		if ((checkCapital || checkSpecialChars) && checkDigits && checkLength)
			setPasswordStrength("medium");
		if (checkCapital && checkDigits && checkLength && checkSpecialChars)
			setPasswordStrength("strong");

		if (!checkCapital || !checkDigits || !checkSpecialChars || !checkLength) {
			setInvalidPasswordFormat(true);
			// for validation during form submission
			return false;
		} else {
			setInvalidPasswordFormat(false);
			// for validation during form submission
			return true;
		}
	};

	const repeatPasswordValidation = e => {
		let userRepeatPassword = e ? e.target.value : repeatPassword;
		if (userRepeatPassword !== password) {
			setInvalidRepeatPassword(true);
			return false;
		} else {
			setInvalidRepeatPassword(false);
			return true;
		}
	};

	const onSubmitHandler = e => {
		e.preventDefault();
		console.log(formData);
		isPristine();
	};
	const onChangeHandler = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		isDirty();
	};

	return (
		<form className="form" method="POST" onSubmit={onSubmitHandler}>
			<div className="form-field">
				<label className="form-label" htmlFor="firstName">
					First name
				</label>
				<input
					className="form-input"
					type="text"
					name="firstName"
					value={firstName}
					onChange={onChangeHandler}
					required
					placeholder="first name"
				/>
			</div>
			<div className="form-field">
				<label className="form-label" htmlFor="lastName">
					Last name
				</label>
				<input
					className="form-input"
					type="text"
					name="lastName"
					value={lastName}
					onChange={onChangeHandler}
					required
					placeholder="last name"
				/>
			</div>
			<div className="form-field">
				<label className="form-label" htmlFor="username">
					Username
				</label>
				<input
					className="form-input"
					type="text"
					name="username"
					value={username}
					onChange={onChangeHandler}
					required
					placeholder="Username"
				/>
			</div>
			<div className="form-field">
				<label className="form-label" htmlFor="password">
					Password
				</label>
				<input
					className="form-input"
					type={`${passwordVisibility ? "text" : "password"}`}
					name="password"
					value={password}
					onChange={e => {
						onChangeHandler(e, formData, setFormData);
						passwordValidation(e);
					}}
					autoComplete="password"
					placeholder="********"
				/>
				<div className={`${passwordStrength} indicator`}>
					<span></span>
					<span></span>
					<span></span>
				</div>
				{invalidPasswordFormat && (
					<span className="error-field">
						Password must contain an Uppercase letter, a number and a special
						character, and must be greater than 7 characters in length{" "}
					</span>
				)}
				<span
					className="passwordVisibility"
					onClick={() => togglePasswordVisibility(!passwordVisibility)}
				>
					{passwordVisibility ? (
						<AiFillEye size="2rem" />
					) : (
						<AiFillEyeInvisible size="2rem" />
					)}
				</span>
			</div>
			<div className="form-field">
				<label className="form-label" htmlFor="repeatPassword">
					Repeat Password
				</label>
				<input
					className="form-input"
					type={`${passwordVisibility ? "text" : "password"}`}
					name="repeatPassword"
					value={repeatPassword}
					onChange={e => {
						onChangeHandler(e, formData, setFormData);
						repeatPasswordValidation(e);
					}}
					placeholder="********"
				/>
				{invalidRepeatPassword && (
					<span className="error-field">
						Repeat password must be the same as main password
					</span>
				)}
			</div>
			<input className="button" type="submit" value="Register" />
			{unSavedPrompt}
		</form>
	);
};

Register.propTypes = {};

export default Register;
