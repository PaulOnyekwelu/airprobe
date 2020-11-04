import { toast } from "react-toastify";


// CONSTANTS
export const REGISTERUSER = "REGISTERUSER";
export const LOGINUSER = "LOGINUSER";
export const UPDATEUSERLOADING = "UPDATEUSERLOADING";
export const UPDATEUSERERROR = "UPDATEUSERERROR";

// ACTIONS
export const registerUser = (formData, history) => async dispatch => {
    try {
        dispatch({
            type: UPDATEUSERLOADING
        })
        console.log(formData);
        dispatch({
            type: REGISTERUSER,
            payload: {formData}
        })
        history.push('/')
        toast.success("User registered Successfully",{ position: toast.POSITION.TOP_CENTER, autoClose:false });
    } catch (error) {
        toast.error(error.message, { position: toast.POSITION.TOP_CENTER, autoClose:false } )
        dispatch({
            type: UPDATEUSERERROR,
            payload: error.message
        });
    }
}

export const loginUser = (formData, history) => async dispatch => {
    try {
        const userData = localStorage.getItem(formData.username);
        if(!userData || userData.password !== formData.password) throw new Error("invalid login credentials");
        dispatch({
            type: LOGINUSER,
            payload: userData
        })
        history.push("/");
        toast.success("Logged In successfully...", { position: toast.POSITION.TOP_CENTER })
    } catch (error) {
        toast.error(error.message, { position: toast.POSITION.TOP_CENTER, autoClose:false } )
        dispatch({
            type: UPDATEUSERERROR,
            payload: error.message
        })
    }
}

// STATE
const INITIAL_STATE = {
    loading: false,
    isLoggedIn: false,
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
            return {...state, user: payload.formData, isLoggedIn: true, loading: false }
        }
        case LOGINUSER: {
            return {...state, user: payload.userData, isLoggedIn: true, loading: false}
        }
        case UPDATEUSERERROR: {
            return {...state, error: payload, loading: false}
        }
        default: {
            return state;
        }
    }
}


export default userReducer;
