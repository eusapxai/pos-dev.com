import React, { Component, Suspense, lazy } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { signIn } from "./actions/authActions";
import cookie from "js-cookie";
import "./css/App.css";
import "./css/utils.css";
import "./css/button.css";
import "./css/colors.css";

const SignIn = lazy(() => import("./SignIn"));
const PublicRoute = lazy(() => import("./partials/GuestRoute"));
const PrivateRoute = lazy(() => import("./partials/AuthRoute"));
const Dashboard = lazy(() => import("./Dashboard"));
const Procurement = lazy(() => import("./Procurement"));
const ProcurementDetails = lazy(() => import("./ProcurementDetails"));
const CreateProcurement = lazy(() => import("./CreateProcurement"));
const Default = lazy(() => import("./Default"));

class App extends Component {
	constructor(props) {
		super(props);
		const token = cookie.get("fth_pos_token");
		if (token) {
			this.props.signIn();
		}
	}

	render() {
		return (
			<BrowserRouter>
				<Suspense fallback={<div className="loader"></div>}>
					<Switch>
						<PrivateRoute
							path="/"
							exact
							component={Dashboard}
							// render={(routeProps) => (
							// 	<ErrorBoundary>
							// 		<Dashboard {...routeProps} />
							// 	</ErrorBoundary>
							// )}
						/>
						<PrivateRoute
							path="/procurement"
							exact
							component={Procurement}
						/>
						<PrivateRoute
							path="/procurement/details/:procurementId"
							exact
							component={ProcurementDetails}
						/>
						<PrivateRoute
							path="/procurement/create"
							exact
							component={CreateProcurement}
						/>
						<PublicRoute path="/signin" exact component={SignIn} />

						<Route component={Default} />
					</Switch>
				</Suspense>
			</BrowserRouter>
		);
	}
}

export default connect(null, { signIn })(App);
