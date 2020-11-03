import { toast } from "react-toastify";


// CONSTANTS
export const REGISTERUSER = "REGISTERUSER";
export const UPDATEUSERLOADING = "UPDATEUSERLOADING";
export const UPDATEUSERERROR = "UPDATEUSERERROR";

// ACTIONS
export const registerUser = (formData) => async dispatch => {
    try {
        dispatch({
            type: UPDATEUSERLOADING
        })
        console.log(formData);
        dispatch({
            type: REGISTERUSER,
            payload: {formData}
        })
        toast.success("User registered Successfully",{ position: toast.POSITION.TOP_CENTER, autoClose:false });
    } catch (error) {
        toast.error(error.message, { position: toast.POSITION.TOP_CENTER, autoClose:false } )
        dispatch({
            type: UPDATEUSERERROR,
            payload: error.message
        });
    }
}

// STATE
const INITIAL_STATE = {
    loading: false,
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
            return {...state, user: payload.formData, loading: false }
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
