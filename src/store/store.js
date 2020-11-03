import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./reducer";

const INITIAL_STATE = {};
const middleware = [thunk];

const store = createStore(rootReducer, INITIAL_STATE,composeWithDevTools(applyMiddleware(...middleware)));

export default store;