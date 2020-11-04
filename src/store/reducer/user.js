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
            type: UPDATEUSERLOADING
        })
        if(!window.localStorage) throw new Error("LocalStorage not supported by device!");
        const username = formData.username.toLowerCase();
        if(localStorage.getItem(username.toLowerCase())) throw new Error("username already taken!");
        const userData = JSON.stringify({ user:{...formData, dateTime: new Date()}, loginCount: 1, isLoggedIn: true});
        console.log(userData);
        console.log(username);
        window.localStorage.setItem(username, userData);
        dispatch({
            type: REGISTERUSER,
            payload: {formData}
        })
        history.push('/')
        toast.success("User registered Successfully",{ position: toast.POSITION.TOP_CENTER });
    } catch (error) {
        toast.error(error.message, { position: toast.POSITION.TOP_CENTER } )
        dispatch({
            type: UPDATEUSERERROR,
            payload: error.message
        });
    }
}

export const loginUser = (formData, history) => async dispatch => {
    try {
        const username = formData.username.toLowerCase()
        const userData = JSON.parse(localStorage.getItem(username));
        if(!userData || userData.user.password !== formData.password) throw new Error("invalid login credentials");
        dispatch({
            type: LOGINUSER,
            payload: userData
        })
        localStorage.setItem(username, JSON.stringify({...userData, loginCount: userData.loginCount + 1}))
        history.push("/");
        toast.success("Logged In successfully...", { position: toast.POSITION.TOP_CENTER })
    } catch (error) {
        toast.error(error.message, { position: toast.POSITION.TOP_CENTER } )
        dispatch({
            type: UPDATEUSERERROR,
            payload: error.message
        })
    }
}


export const logoutUser = (username, history) => async dispatch => {
    try {
        const usernameToLower = username.toLowerCase();
        const userData = JSON.parse(localStorage.getItem(usernameToLower));
        localStorage.setItem(usernameToLower, JSON.stringify({...userData, isLoggedIn: false }))
        dispatch({
            type: LOGOUT
        })
        history.push("/");

    } catch (error) {
        toast.error(error.message, {position: toast.POSITION.TOP_CENTER})
        dispatch({
            type:UPDATEUSERERROR,
            payload: error.message
        })
    }
}


// STATE
const INITIAL_STATE = {
    loading: false,
    isLoggedIn: false,
    loginCount: 0,
    user: {},
    error: null
};

// REDUCER
const userReducer = (state=INITIAL_STATE, action) => {
    const {type, payload} = action;
    switch(type){
        case UPDATEUSERLOADING: {
            return {...state, loading: true }
        }
        case REGISTERUSER: {
            return {...state, user: payload.formData, isLoggedIn: true, loading: false, loginCount: 1 }
        }
        case LOGINUSER: {
            return {...state, user: payload.user, isLoggedIn: true, loading: false, loginCount: payload.loginCount + 1 }
        }
        case UPDATEUSERERROR: {
            return {...state, error: payload, loading: false}
        }
        case LOGOUT: {
            return {...state, isLoggedIn: false, user: {}, loginCount: 0, error: null, loading:false }
        }
        default: {
            return state;
        }
    }
}


export default userReducer;
