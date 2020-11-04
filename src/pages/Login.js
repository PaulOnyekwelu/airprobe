import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {loginUser} from "../store/reducer/user";

const Login = ({loginUser, history}) => {
	const IForm = {
		username: "",
		password: ""
	};

	const [formData, setFormData] = useState(IForm);
	const [passwordVisibility, togglePasswordVisibility] = useState(false);

	const { username, password } = formData;

	const onSubmitHandler = e => {
		e.preventDefault();
		loginUser(formData, history);
	};
    const onChangeHandler = e => {
		setFormData({...formData, [e.target.name]: e.target.value})
	};


	return (
		<form
			className="form"
			method="POST"
			onSubmit={onSubmitHandler}
		>
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
					autoComplete="username"
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
					onChange={onChangeHandler}
					autoComplete="password"
					placeholder="********"

				/>
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
			<input className="button" type="submit" value="Login" />
		</form>
	);
};

Login.propTypes = {};

export default connect(null, {loginUser})(withRouter(Login));
