import React, { Component } from "react";
import { connect } from "react-redux";
import ErrorBoundary from "./partials/ErrorBoundary";
import cookie from "js-cookie";
import { isDev, clientAxios } from "./config/config";
import { signIn } from "./actions/authActions";
import "./css/signin.css";
import Logo from "./logo.png";
import bgImage from "./img/bg02.png";

class SignIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			isApiError: false,
			isValidInput: true,
			isUsername: false,
			isPassword: false,
			username: "",
			password: "",
			usernameMsg: "",
			passwordMsg: "",
			errorMsg: "",
		};
	}

	handleUsername = (e) => {
		e.preventDefault();
		const username = this.username.value;
		const regex = /^[a-zA-Z\-]+$/;
		if (regex.test(username)) {
			const password = this.password.value;
			if (password || password.length !== 0) {
				this.setState({
					isValidInput: false,
					isUsername: false,
					username: username,
				});
			} else {
				this.setState({
					isValidInput: true,
					isUsername: false,
					username: username,
				});
			}
		} else {
			this.setState({
				isValidInput: true,
				isUsername: true,
				username: username,
				usernameMsg: "Please enter a valid username.",
			});
		}
	};

	handlePassword = (e) => {
		e.preventDefault();
		const password = this.password.value;
		if (password || password.length !== 0) {
			const username = this.username.value;
			if (username || username.length !== 0) {
				this.setState({
					isValidInput: false,
					isPassword: false,
					password: password,
				});
			} else {
				this.setState({
					isValidInput: true,
					isPassword: false,
					password: password,
				});
			}
		} else {
			this.setState({
				isValidInput: true,
				isPassword: true,
				password: password,
				passwordMsg: "Password must not be empty.",
			});
		}
	};

	onSubmitForm = (e) => {
		e.preventDefault();

		if (
			!this.state.isValidInput &&
			!this.state.isPassword &&
			!this.state.isUsername
		) {
			const data = {
				username: this.state.username,
				password: this.state.password,
			};
			clientAxios
				.post("/admin/login", data)
				.then((res) => {
					if (isDev) {
						console.log(res);
					}
					if (res.data.statusCode === 200) {
						cookie.set("fth_pos_token", res.data.data.access_token);
						// localStorage.setItem(
						// 	"fth_pos_cityCode",
						// 	res.data.data.user.cityCode
						// );
						this.props.signIn(res.data.data.access_token);
						this.props.location.state !== undefined
							? this.props.history.push(
									this.props.location.state.from.pathname
							  )
							: this.props.history.push("/");
					} else {
						this.props.errorNotify(true);
						this.setState({
							isLoading: false,
							isApiError: true,
							errorMsg: "Something went wrong, please try again.",
						});
						const errors = {
							platform: "website",
							location: "handleForm()->try() at auth/SignIn.js",
							title: "/api/v1/auth/login api error",
							description: JSON.stringify(res.data),
							flag: 1,
						};
						clientAxios
							.post("/api/v1/error/notification", errors)
							.then((res) => {
								if (isDev) {
									console.log(res);
								}
							})
							.catch((e) => {
								if (isDev) {
									console.log(e.response);
								}
							});
					}
				})
				.catch((e) => {
					if (isDev) {
						console.log(e.response);
					}
					if (e.response.status === 401) {
						this.setState({
							isLoading: false,
							isApiError: true,
							errorMsg: "Username or Password is incorrect.",
						});
					} else if (e.response.status === 400) {
						this.setState({
							isLoading: false,
							isApiError: true,
							errorMsg: e.response.data.message,
						});
					} else {
						this.props.errorNotify(true);
						this.setState({
							isLoading: false,
							isApiError: true,
							errorMsg: "Something went wrong, Try Again!",
						});
						const errors = {
							platform: "website",
							location: "handleForm()->catch() at auth/SignIn.js",
							title: "/api/v1/auth/login api error",
							description: JSON.stringify(e.response.data),
							flag: 1,
						};
						clientAxios
							.post("/api/v1/error/notification", errors)
							.then((res) => {
								if (isDev) {
									console.log(res);
								}
							})
							.catch((e) => {
								if (isDev) {
									console.log(e.response);
								}
							});
					}
				});
		}
	};

	render() {
		return (
			<ErrorBoundary>
				<section
					id="signin"
					className="min-height-100"
					style={{
						backgroundImage: `url(${bgImage})`,
						backgroundPosition: "center",
						backgroundSize: "cover",
						backgroundRepeat: "no-repeat",
					}}
				>
					<div className="container">
						<div className="row min-height-100 justify-content-center align-items-center">
							<div className="col-xs-10 col-sm-10 col-md-6 col-lg-4">
								<div className="card shadow-lg br-1">
									<div className="card-body">
										<div className="w-100">
											<div className="text-center">
												<img
													className="logo"
													src={Logo}
													alt="logo"
												/>
												<h1 className="text-green fs-35 font-weight-bold">
													Farm
													<span className="text-red fs-50">
														to
													</span>
													Home
												</h1>

												<p className="text-center py-3">
													Sign in to start your
													session
												</p>
											</div>
										</div>
										<form onSubmit={this.onSubmitForm}>
											<div className="py-3">
												{this.state.isApiError ? (
													<div
														className="alert alert-danger"
														role="alert"
													>
														{this.state.errorMsg}
													</div>
												) : (
													""
												)}
											</div>
											<div className="form-group">
												<div className="position-relative">
													<input
														type="text"
														className={
															this.state
																.isUsername ||
															this.state
																.isApiError
																? "form-control form-control-danger"
																: "form-control"
														}
														id="username"
														aria-describedby="username"
														placeholder="Enter Username"
														required
														autoFocus
														defaultValue={
															this.state.username
														}
														ref={(c) =>
															(this.username = c)
														}
														onChange={
															this.handleUsername
														}
													/>
													<div className="form-icon">
														<svg
															className="signin-user-icon"
															viewBox="0 0 20 20"
														>
															<path d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"></path>
														</svg>
													</div>
												</div>
												{this.state.isUsername ? (
													<small
														id="emailHelp"
														className="form-text text-red"
													>
														{this.state.usernameMsg}
													</small>
												) : (
													""
												)}
											</div>
											<div className="form-group">
												<div className="position-relative">
													<input
														type="password"
														className={
															this.state
																.isPassword ||
															this.state
																.isApiError
																? "form-control form-control-danger"
																: "form-control"
														}
														id="password"
														placeholder="Enter Password"
														defaultValue={
															this.state.password
														}
														required
														ref={(c) =>
															(this.password = c)
														}
														onChange={
															this.handlePassword
														}
													/>
													<div className="form-icon">
														<svg
															className="signin-lock-icon"
															viewBox="0 0 20 20"
														>
															<path d="M17.308,7.564h-1.993c0-2.929-2.385-5.314-5.314-5.314S4.686,4.635,4.686,7.564H2.693c-0.244,0-0.443,0.2-0.443,0.443v9.3c0,0.243,0.199,0.442,0.443,0.442h14.615c0.243,0,0.442-0.199,0.442-0.442v-9.3C17.75,7.764,17.551,7.564,17.308,7.564 M10,3.136c2.442,0,4.43,1.986,4.43,4.428H5.571C5.571,5.122,7.558,3.136,10,3.136 M16.865,16.864H3.136V8.45h13.729V16.864z M10,10.664c-0.854,0-1.55,0.696-1.55,1.551c0,0.699,0.467,1.292,1.107,1.485v0.95c0,0.243,0.2,0.442,0.443,0.442s0.443-0.199,0.443-0.442V13.7c0.64-0.193,1.106-0.786,1.106-1.485C11.55,11.36,10.854,10.664,10,10.664 M10,12.878c-0.366,0-0.664-0.298-0.664-0.663c0-0.366,0.298-0.665,0.664-0.665c0.365,0,0.664,0.299,0.664,0.665C10.664,12.58,10.365,12.878,10,12.878"></path>
														</svg>
													</div>
												</div>
												{this.state.isPassword ? (
													<small
														id="emailHelp"
														className="form-text text-red"
													>
														{this.state.passwordMsg}
													</small>
												) : (
													""
												)}
											</div>
											<div className="w-100 text-center pt-3">
												<button
													type="submit"
													className="btn-red-sm"
													disabled={
														this.state.isValidInput
															? "disabled"
															: ""
													}
												>
													Sign In
												</button>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</ErrorBoundary>
		);
	}
}

// const mapStateToProps = (state) => ({});

// const mapDispatchToProps = {};

export default connect(null, { signIn })(SignIn);
