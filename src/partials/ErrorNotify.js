import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { errorNotify } from "../actions/notificationActions";
import { Link } from "react-router-dom";

class ErrorNotify extends Component {
	refreshPage = () => {
		this.props.errorNotify(false);
		window.location.reload(false);
	};

	showQueryHelp = () => {
		return (
			<>
				<Modal.Body>
					<div className="text-center">
						<img src="/img/extra/sad_face.webp" alt="oops" />
					</div>
					<h3 className="text-center pt-4 pb-4">
						Something went wrong.
					</h3>
					<p>
						In case of multiple failures, please call Farm to Home
						team at{" "}
						<a href="tel:+923015551155" className="text-green">
							+92 301 5551155
						</a>{" "}
						for support or please try again.
					</p>
					<button
						className="btn-green-sm"
						onClick={() => this.refreshPage()}
					>
						Retry
					</button>
					<Link to="/">
						<button
							className="btn-green-sm"
							onClick={() => this.props.errorNotify(false)}
						>
							Go Home
						</button>
					</Link>
				</Modal.Body>
			</>
		);
	};

	render() {
		return (
			<>
				<Modal
					size="sm"
					show={this.props.notification.hasError}
					onHide={() => this.props.errorNotify(false)}
					aria-labelledby="example-modal-sizes-title-sm"
					backdrop="static"
					centered
				>
					{this.props.notification.hasError
						? this.showQueryHelp()
						: ""}
				</Modal>
			</>
		);
	}
}

const mapStateToProps = (state) => ({
	notification: state.notification.notification,
});

export default connect(mapStateToProps, { errorNotify })(ErrorNotify);
