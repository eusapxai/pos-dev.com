import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "./partials/Header";
import { Link } from "react-router-dom";
import { fetchProcurementDetails } from "./actions/procurementActions";

class ProcurementDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount = () => {
		if (this.props.match.params) {
			const userId = this.props.auth.isSignedIn
				? this.props.auth.user.userId
				: "";
			const { procurementId } = this.props.match.params;
			this.props.fetchProcurementDetails(procurementId, userId);
		} else {
			this.props.history.push("/404");
		}
		window.scrollTo(0, 0);
	};

	render() {
		return (
			<>
				<Header />
				<section className="bg-light py-5 min-height-100">
					<div className="container">
						<div className="row justify-content-center">
							<div className="col-12">
								<div className="card shadow rounded">
									<div className="my-3"></div>
									<table className="table table-responsive">
										<thead>
											<tr>
												<th scope="col">#</th>
												<th scope="col">Name</th>
												<th scope="col">
													Required Quantity
												</th>
												<th scope="col">
													Purchased Quantity
												</th>
												<th>Price</th>
												<th>Unit</th>
												<th>Total Price</th>
											</tr>
										</thead>

										<tbody>
											{!this.props.procurementDetails
												.isLoading ? (
												this.props.procurementDetails.response.data.products.map(
													(procurement) => (
														<tr
															key={
																procurement.procurementProductId
															}
														>
															{console.log(
																this.props
																	.procurementDetails
															)}
															<th scope="row">
																{
																	procurement.procurementProductId
																}
															</th>
															<td>
																{
																	procurement.productNameEn
																}
															</td>
															<td>
																{
																	procurement.requiredQuantity
																}
															</td>
															<td>
																{
																	procurement.purchasedQuantity
																}
															</td>
															<td>
																{
																	procurement.purchasedPrice
																}
															</td>
															<td>
																{
																	procurement.unit
																}
															</td>
															<td>
																{
																	procurement.totalPrice
																}
															</td>
														</tr>
													)
												)
											) : (
												<tr className="spinner"></tr>
											)}
										</tbody>
									</table>
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
	procurementDetails: state.procurement.procurementDetails,
});

export default connect(mapStateToProps, { fetchProcurementDetails })(
	ProcurementDetails
);
