import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import store from "./store/store";
import Home from "./pages/Home";

const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));

toast.configure();
function App() {
	return (
		<Provider store={store}>
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
		</Provider>
	);
}

export default App;
