import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "./partials/Header";

export class Dashboard extends Component {
	render() {
		return (
			<>
				<Header />
			</>
		);
	}
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
