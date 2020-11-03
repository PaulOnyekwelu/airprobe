import { combineReducers } from "redux";
import {default as user} from "./user";


const rootReducer = combineReducers({ user });

export default rootReducer;