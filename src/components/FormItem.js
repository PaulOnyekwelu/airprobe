import React from "react";

const FormItem = ({title, name, type, value, onChangeHandler}) => {
	return (
		<div className="form-field">
			<label className="form-label" htmlFor={name}>
				{title}
			</label>
			<input
				className="form-input"
				type={type}
				name={name}
				value={value}
				onChange={onChangeHandler}
				required
			/>
		</div>
	);
};


export default FormItem;