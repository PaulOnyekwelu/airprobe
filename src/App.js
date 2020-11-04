import React, { lazy, Suspense, useLayoutEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import { persistLogin } from "./store/reducer/user";

const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));

toast.configure();
function App({ persistLogin }) {
	useLayoutEffect(() => {
		persistLogin();
	});

	return (
		<BrowserRouter>
			<div className="App">
				<Header />
			</div>
			<div className="app_main">
				<Suspense fallback={<div>loading...</div>}>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/register" component={Register} />
					</Switch>
				</Suspense>
			</div>
		</BrowserRouter>
	);
}

export default connect(null, { persistLogin })(App);
