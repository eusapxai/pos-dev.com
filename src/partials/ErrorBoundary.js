import React, { Component } from "react";
import { connect } from "react-redux";
// import { errorLogging, errorNotify } from "../../actions/notificationActions";
// import { isIOS } from "react-device-detect";
import ErrorNotify from "./ErrorNotify";

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true };
	}

	// componentDidCatch(error, errorInfo) {
	// const platform = "website";
	// const description = error.toString();
	// const location =
	// 	this.props.children.type.displayName !== undefined
	// 		? this.props.children.type.displayName
	// 		: this.props.children.type._result.displayName;
	// const userId = "pos admin";
	// const flag = 1;
	// const title = "Front end error";

	// errorLogging(platform, location, title, description, flag, userId);

	// this.props.errorNotify(true);
	// }

	render() {
		if (this.state.hasError) {
			return <ErrorNotify />;
		}

		return this.props.children;
	}
}

const mapStateToProps = (state) => ({
	auth: state.authorization.auth,
});

export default connect(mapStateToProps)(ErrorBoundary);
