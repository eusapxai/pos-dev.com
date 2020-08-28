import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Header extends Component {
	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-white">
				<Link className="navbar-brand" to="/">
					<h4>Farm To Home - {this.props.auth.user.city}</h4>
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div
					className="collapse navbar-collapse"
					id="navbarSupportedContent"
				>
					<ul className="navbar-nav ml-auto">
						<li className="nav-item active">
							<Link
								className="nav-link"
								to="/procurement"
								target="_blank"
							>
								Precurement
							</Link>
						</li>
						<li className="nav-item dropdown">
							<button
								className="btn-red-sm dropdown-toggle"
								type="button"
								id="dropdownMenuButton"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								{this.props.auth.user.name}
							</button>
							<div
								className="dropdown-menu"
								aria-labelledby="dropdownMenuButton"
							>
								<Link to="/" className="dropdown-item">
									Logout
								</Link>
							</div>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.authorization.auth,
});

export default connect(mapStateToProps)(Header);
