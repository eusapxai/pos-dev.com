import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import Cookie from "js-cookie";
import ErrorBoundary from "../partials/ErrorBoundary";

const PrivateRoute = ({ component: Component, ...rest }) => {
	const token = Cookie.get("fth_pos_token");

	if (token && rest.auth.isLoading) {
		return <div className="loading"></div>;
	} else {
		return (
			<Route
				{...rest}
				render={(props) =>
					rest.auth.isSignedIn ? (
						<ErrorBoundary>
							<Component {...props} />
						</ErrorBoundary>
					) : (
						<Redirect
							to={{
								pathname: "/signin",
								state: { from: props.location },
							}}
						/>
					)
				}
			/>
		);
	}
};

const mapStateToProps = (state) => ({
	auth: state.authorization.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
