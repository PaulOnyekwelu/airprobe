import React, { lazy, Suspense, useLayoutEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'mapbox-gl/dist/mapbox-gl.css';
import Header from "./components/Header";
import Home from "./pages/Home";
import { persistLogin } from "./store/reducer/user";
import Spinner from "./components/Spinner";

const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const MapSection = lazy(() => import("./pages/MapSection"))


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
				<Suspense fallback={<Spinner />}>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/register" component={Register} />
						<Route exact path="/map" component={MapSection} />
					</Switch>
				</Suspense>
			</div>
		</BrowserRouter>
	);
}

export default connect(null, { persistLogin })(App);
