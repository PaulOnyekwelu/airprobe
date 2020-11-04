import { toast } from "react-toastify";

// CONSTANTS
export const REGISTERUSER = "REGISTERUSER";
export const LOGINUSER = "LOGINUSER";
export const UPDATEUSERLOADING = "UPDATEUSERLOADING";
export const UPDATEUSERERROR = "UPDATEUSERERROR";
export const LOGOUT = "LOGOUT";

// ACTIONS
export const registerUser = (formData, history) => async dispatch => {
	try {
		dispatch({
			type: UPDATEUSERLOADING,
		});
		if (!window.localStorage)
			throw new Error("LocalStorage not supported by device!");
		const username = formData.username.toLowerCase();
		let users = JSON.parse(localStorage.getItem("users"));
		if (!users) users = {};
		const userExist = users[username];
		if (userExist) throw new Error("Username already taken!");
		const userData = {
			user: { ...formData, dateTime: new Date() },
			loginCount: 1,
			isLoggedIn: true,
		};
		users[formData.username.toLowerCase()] = userData;
		window.localStorage.setItem("users", JSON.stringify(users));
		window.localStorage.setItem("user", JSON.stringify(userData));
		dispatch({
			type: REGISTERUSER,
			payload: { formData, users },
		});
		history.push("/");
		toast.success("User registered Successfully", {
			position: toast.POSITION.TOP_CENTER,
		});
	} catch (error) {
		toast.error(error.message, { position: toast.POSITION.TOP_CENTER });
		dispatch({
			type: UPDATEUSERERROR,
			payload: error.message,
		});
	}
};

export const loginUser = (formData, history) => async dispatch => {
	try {
		const username = formData.username.toLowerCase();
		const users = JSON.parse(localStorage.getItem("users"));
		let userData = users[username];
		if (!userData || userData.user.password !== formData.password)
			throw new Error("invalid login credentials");

		userData = { ...userData, loginCount: userData.loginCount + 1 };
		users[username] = userData;

		localStorage.setItem("user", JSON.stringify(userData));

		localStorage.setItem("users", JSON.stringify(users));

		dispatch({
			type: LOGINUSER,
			payload: { userData, users },
		});

		history.push("/");
		toast.success("Logged In successfully...", {
			position: toast.POSITION.TOP_CENTER,
		});
	} catch (error) {
		toast.error(error.message, { position: toast.POSITION.TOP_CENTER });
		dispatch({
			type: UPDATEUSERERROR,
			payload: error.message,
		});
	}
};

export const persistLogin = () => async dispatch => {
	try {
		const userData = JSON.parse(localStorage.getItem("user"));
		const users = JSON.parse(localStorage.getItem("users"));
		if (userData) {
			dispatch({
				type: LOGINUSER,
				payload: { userData, users },
			});
		}
	} catch (error) {
		toast.error(error.message, { position: toast.POSITION.TOP_CENTER });
		dispatch({
			type: UPDATEUSERERROR,
			payload: error.message,
		});
	}
};

export const logoutUser = history => async dispatch => {
	try {
		localStorage.removeItem("user");
		dispatch({
			type: LOGOUT,
		});
		history.push("/");
	} catch (error) {
		toast.error(error.message, { position: toast.POSITION.TOP_CENTER });
		dispatch({
			type: UPDATEUSERERROR,
			payload: error.message,
		});
	}
};

// STATE
const INITIAL_STATE = {
	loading: false,
	isLoggedIn: false,
	loginCount: 0,
	user: {},
	error: null,
	users: {},
};

// REDUCER
const userReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;
	switch (type) {
		case UPDATEUSERLOADING: {
			return { ...state, loading: true };
		}
		case REGISTERUSER: {
			return {
				...state,
				user: payload.formData,
				users: payload.users,
				isLoggedIn: true,
				loading: false,
				loginCount: 1,
			};
		}
		case LOGINUSER: {
			return {
				...state,
				user: payload.userData.user,
				users: payload.users,
				isLoggedIn: true,
				loading: false,
				loginCount: payload.userData.loginCount,
			};
		}
		case UPDATEUSERERROR: {
			return { ...state, error: payload, loading: false };
		}
		case LOGOUT: {
			return {
				...state,
				isLoggedIn: false,
				user: {},
				loginCount: 0,
				error: null,
				loading: false,
			};
		}
		default: {
			return state;
		}
	}
};

export default userReducer;
