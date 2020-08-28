import React, { Component } from "react";
import { connect } from "react-redux";
import { updateCart, removeFromCart } from "./actions/cartActions";

class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	removeFromCart = (productId) => {
		console.log("removed from list");
		this.props.removeFromCart(
			this.props.cart.cartItems,
			productId,
			this.props.auth.user.cityCode,
			this.props.auth.user.userId
		);
	};

	onChangeQuantity = (event) => {
		const productId = event.target.name;
		const quantity = event.target.value;
		this.props.updateCart(
			this.props.cart.cartItems,
			productId,
			quantity,
			this.props.auth.user.cityCode,
			this.props.auth.user.userId
		);
	};

	render() {
		console.log(this.props.cart);
		if (!this.props.cart.isLoading) {
			if (this.props.cart.cartItems.length > 0) {
				return (
					<div className="p-3">
						<table class="table">
							<thead>
								<tr>
									<th scope="col">#</th>
									<th scope="col">Product Name</th>
									<th scope="col">Quantity</th>
									<th scope="col">Action</th>
								</tr>
							</thead>
							<tbody>
								{this.props.cart.cartItems.map(
									(cartItem, index) => (
										<tr key={cartItem.productId}>
											<td>{index + 1}</td>
											<td>{cartItem.productNameEn}</td>
											<td>
												<input
													type="number"
													name={cartItem.productId}
													ref={(c) =>
														(this.quantity = c)
													}
													defaultValue={
														cartItem.quantity
													}
													onChange={
														this.onChangeQuantity
													}
												/>
											</td>
											<td>
												<button
													className="btn-red-sm"
													onClick={() =>
														this.removeFromCart(
															cartItem.productId
														)
													}
												>
													remove
												</button>
											</td>
										</tr>
									)
								)}
							</tbody>
						</table>
					</div>
				);
			} else {
				return (
					<div className="card shodow p-4">
						<div className="text-center">
							<h4>No item added yet</h4>
						</div>
					</div>
				);
			}
		} else {
			return <div className="spinner"></div>;
		}
	}
}

const mapStateToProps = (state) => ({
	cart: state.cart.cart,
	auth: state.authorization.auth,
});

export default connect(mapStateToProps, { updateCart, removeFromCart })(Cart);
