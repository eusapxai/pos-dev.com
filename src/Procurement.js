import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "./partials/Header";
import { Link } from "react-router-dom";
import { fetchProcurementList } from "./actions/procurementActions";
import queryString from "query-string";

class Procurement extends Component {
	constructor(props) {
		super(props);
		this.state = {
			msgSuccess: false,
		};
		this.props.fetchProcurementList("");
		if (this.props.location.search) {
			const { status } = queryString.parse(this.props.location.search);
			if (status === "1") {
				this.state = {
					msgSuccess: true,
				};
			}
		}
	}
	render() {
		return (
			<>
				<Header />
				<section className="bg-light py-5 min-height-100">
					<div className="container">
						<div className="row justify-content-center">
							<div className="col-12">
								{this.state.msgSuccess ? (
									<div
										class="alert alert-success"
										role="alert"
									>
										Procurement successfully sent
									</div>
								) : (
									""
								)}
								<div className="my-2">
									<Link
										className="btn-green-sm"
										to="/procurement/create"
									>
										Generate
									</Link>
								</div>
								<div className="card shadow rounded">
									<table className="table table-responsive">
										<thead>
											<tr>
												<th scope="col">#</th>
												<th scope="col">
													Amount Given
												</th>
												<th scope="col">Asigned To</th>
												<th scope="col">City</th>
												<th scope="col">Verified</th>
												<th scope="col">Status</th>
												<th scope="col">Date</th>
												<th scope="col">View</th>
											</tr>
										</thead>

										<tbody>
											{!this.props.procurementList
												.isLoading ? (
												this.props.procurementList.response.data.map(
													(procurement, index) => (
														<tr
															key={
																procurement.procurementId
															}
														>
															<th scope="row">
																{index + 1}
															</th>
															<td>
																{
																	procurement.amountGiven
																}
															</td>
															<td>
																{
																	procurement.asignedTo
																}
															</td>
															<td>
																{
																	procurement.city
																}
															</td>
															<td>
																{procurement.listVerified
																	? "Verified"
																	: "Not Verified"}
															</td>
															<td>
																{
																	procurement.status
																}
															</td>
															<td>
																{
																	procurement.generatedAt
																}
															</td>
															<td>
																<Link
																	to={{
																		pathname: `/procurement/details/${procurement.procurementId}`,
																	}}
																>
																	Details
																</Link>
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
	procurementList: state.procurement.procurementList,
});

export default connect(mapStateToProps, { fetchProcurementList })(Procurement);
