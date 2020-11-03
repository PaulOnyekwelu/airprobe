import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import store from "./store/store";
import Login from "./components/Login";
import Register from "./components/Register";

toast.configure();
function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<div className="App">
					<Header />
				</div>
				<div className="app_main">
					<Switch>
						<Route exact path="/" component={Login} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/register" component={Register} />
					</Switch>
				</div>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
