import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "./partials/Header";
import { Link } from "react-router-dom";
import { createProcurementList } from "./actions/procurementActions";
import { fetchProductsList } from "./actions/productsActions";
import { addToCart, deleteCart } from "./actions/cartActions";
import { getUsers } from "./actions/authActions";
import Select from "react-select";
import DatePicker from "react-date-picker";
import Cart from "./Cart";
import { isDev, clientAxios } from "./config/config";
import cookie from "js-cookie";
import Moment from "react-moment";

class CreateProcurement extends Component {
	constructor(props) {
		super(props);
		this.state = {
			date: new Date(),
			userId: "",
			productId: "",
			quantity: "",
			amountGiven: "",
			errorApi: false,
			errorApiMsg: "",
			loadStats: false,
			isCartLoading: false,
			productStats: {},
		};
		this.props.fetchProductsList(this.props.auth.user.cityCode, "");
		this.props.getUsers();
	}

	componentDidMount = () => {
		window.scrollTo(0, 0);
	};

	onChangeDate = (date) => {
		this.setState({ date: date });
	};

	onChangeProduct = (product) => {
		this.setState({ productId: product.value, loadStats: false });
		const token = cookie.get("fth_pos_token");
		clientAxios.defaults.headers.common[
			"Authorization"
		] = `Bearer ${token}`;
		clientAxios
			.get(`/admin/procurement/product/${product.value}`)
			.then((res) => {
				if (isDev) {
					console.log(res);
				}
				this.setState({ productStats: res.data.data, loadStats: true });
			})
			.catch((e) => {
				if (isDev) {
					console.log(e.response);
				}
			});
	};

	onChangeUser = (user) => {
		this.setState({ userId: user.value });
	};

	onChangeQuantity = () => {
		this.setState({ quantity: this.quantity.value });
	};

	onChangeAmount = () => {
		this.setState({ amountGiven: this.amount.value });
	};

	onSubmitToCart = (event) => {
		event.preventDefault();
		this.setState({ isCartLoading: true });
		this.props.addToCart(
			this.props.cart.cartItems,
			this.state.productId,
			this.state.quantity,
			this.props.auth.user.cityCode,
			this.props.auth.user.userId
		);
		setTimeout(() => {
			this.setState({ isCartLoading: false });
		}, 500);
	};

	onSubmitProcurement = (event) => {
		event.preventDefault();
		const currentDate =
			this.state.date.getFullYear() +
			"-" +
			(this.state.date.getMonth() + 1) +
			"-" +
			this.state.date.getDate();
		if (
			this.props.cart.cartItems.length > 0 &&
			this.state.userId !== "" &&
			this.props.auth.user.cityId &&
			this.state.amountGiven !== ""
		) {
			const data = {
				products: this.props.cart.cartItems,
				asigned_to: this.state.userId,
				amount_given: this.state.amountGiven,
				date: currentDate,
				city_id: this.props.auth.user.cityId,
			};
			clientAxios
				.post("/admin/procurement", data)
				.then((res) => {
					if (isDev) {
						console.log(res);
					}
					if (res.data.statusCode === 200) {
						this.props.deleteCart(this.props.auth.user.cityCode);
						this.props.history.push({
							pathname: "/procurement",
							search: "?status=1",
						});
					} else {
						this.setState({
							isLoading: false,
							errorApi: true,
							errorApiMsg: "Something went wrong.",
						});
					}
				})
				.catch((e) => {
					if (isDev) {
						console.log(e.response);
					}
					if (e.response.status === 400) {
						this.setState({
							isLoading: false,
							errorApi: true,
							errorApiMsg: e.response.data.message,
						});
					} else {
						this.setState({
							isLoading: false,
							errorApi: true,
							errorApiMsg: "Something went wrong, Try Again!",
						});
					}
				});
		} else {
			this.setState({
				errorApi: true,
				errorApiMsg: "please fill all the information",
			});
		}
	};

	getProductStats = () => {
		return (
			<div className="card shadow rounded">
				<div className="d-inline-flex">
					{this.state.productStats.map((stats) => (
						<div className="p-2 w-25">
							<h6 className="text-center">
								<Moment format="D MMM">
									{stats.createdAt}
								</Moment>
							</h6>
							<hr />
							<h6 className="text-center">
								{stats.totalQuantity}
							</h6>
						</div>
					))}
				</div>
			</div>
		);
	};

	render() {
		return (
			<>
				<Header />
				<section className="bg-light py-5 min-height-100">
					<div className="container">
						<div className="row justify-content-center">
							<div className="col-12">
								{this.state.errorApi ? (
									<div
										class="alert alert-danger"
										role="alert"
									>
										{this.state.errorApiMsg}
									</div>
								) : (
									""
								)}
								<div className="card shadow rounded">
									<div className="p-4">
										<form onSubmit={this.onSubmitToCart}>
											<div className="p-3">
												<div className="form-group">
													<DatePicker
														onChange={
															this.onChangeDate
														}
														value={this.state.date}
													/>
												</div>
											</div>
											<div className="row">
												<div className="col">
													<div className="form-group">
														{/* <label htmlFor="product">
																Select Product
															</label> */}
														{!this.props
															.productsList
															.isLoading ? (
															<Select
																onChange={
																	this
																		.onChangeProduct
																}
																options={
																	this.props
																		.productsList
																		.response
																		.data
																}
															/>
														) : (
															""
														)}
													</div>
												</div>
											</div>
											{this.state.loadStats ? (
												<div className="row">
													<div className="w-100 mx-auto my-4">
														{this.getProductStats()}
													</div>
												</div>
											) : (
												""
											)}
											<div className="row">
												<div className="col">
													<div className="form-group">
														{/* <label htmlFor="quantity">
															Quantity
														</label> */}
														<input
															type="number"
															name="quantity"
															className="form-control"
															id="quantity"
															placeholder="enter quantity"
															ref={(c) =>
																(this.quantity = c)
															}
															onChange={
																this
																	.onChangeQuantity
															}
															required
														/>
													</div>
												</div>
												<div className="col">
													<div className="m-auto">
														<button
															type="submit"
															className="btn-green-sm"
														>
															Add
														</button>
													</div>
												</div>
											</div>
										</form>
									</div>
								</div>
								<div className="card shahdow rounded mt-4">
									{!this.props.cart.cartItems.isLoading &&
									!this.state.isCartLoading ? (
										<div className="pt-3">
											<Cart />
										</div>
									) : (
										""
									)}
									<div className="p-3">
										<form
											onSubmit={this.onSubmitProcurement}
										>
											<div className="row">
												<div className="col">
													<div className="form-group">
														{/* <label htmlFor="product">
																Select Product
															</label> */}
														{!this.props.users
															.isLoading ? (
															<Select
																onChange={
																	this
																		.onChangeUser
																}
																options={
																	this.props
																		.users
																		.response
																		.data
																}
															/>
														) : (
															""
														)}
													</div>
												</div>
												<div className="col">
													<div className="form-group">
														{/* <label htmlFor="quantity">
															Quantity
														</label> */}
														<input
															type="number"
															name="amount"
															className="form-control"
															id="amount"
															placeholder="Enter Amount"
															ref={(c) =>
																(this.amount = c)
															}
															onChange={
																this
																	.onChangeAmount
															}
															required
														/>
													</div>
												</div>
												<div className="col mx-auto">
													<div className="m-auto">
														<button
															type="submit"
															className="btn-green-sm"
														>
															Submit
														</button>
													</div>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.authorization.auth,
	users: state.authorization.users,
	productsList: state.products.productsList,
	cart: state.cart.cart,
});

export default connect(mapStateToProps, {
	createProcurementList,
	fetchProductsList,
	addToCart,
	deleteCart,
	getUsers,
})(CreateProcurement);
