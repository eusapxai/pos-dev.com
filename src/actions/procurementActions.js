import {
	FETCH_PROCUREMENT_LIST,
	UPDATE_PROCUREMENT,
	FETCH_PROCUREMENT_DETAILS,
	CREATE_PROCUREMENT_LIST,
} from "./types";
import { isDev, clientAxios } from "../config/config";
import { errorLogging } from "./notificationActions";
// import Cookie from "js-cookie";

export const createProcurementList = (
	amount,
	asignedTo,
	cityId,
	products,
	userId
) => {
	const data = {
		amount_given: amount,
		asigned_to: asignedTo,
		city_id: cityId,
		products: products,
	};
	return async (dispatch) => {
		await clientAxios
			.post("/admin/procurement", data)
			.then((res) => {
				if (isDev) {
					console.log(res);
				}
				dispatch({
					type: CREATE_PROCUREMENT_LIST,
					payload: {
						isLoading: false,
						hasError: false,
						response: res.data,
					},
				});
			})
			.catch((e) => {
				if (isDev) {
					console.log(e.response);
				}
				if (e.response.status !== 400) {
					const platform = "website";
					const location = "actions/productActions.js";
					const title = "/api/v1/category/products api error";
					const description = JSON.stringify(e.response.data);
					const flag = 1;
					errorLogging(
						platform,
						location,
						title,
						description,
						flag,
						userId
					);
				}
				dispatch({
					type: CREATE_PROCUREMENT_LIST,
					payload: {
						isLoading: false,
						hasError: true,
						response: e.response.data,
					},
				});
			});
	};
};

export const fetchProcurementList = (userId) => (dispatch) => {
	// const token = Cookie.get("fth_pos_token");
	// clientAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	clientAxios
		.get("/admin/procurement")
		.then((res) => {
			if (isDev) {
				console.log(res);
			}
			dispatch({
				type: FETCH_PROCUREMENT_LIST,
				payload: {
					isLoading: false,
					hasError: false,
					response: res.data,
				},
			});
		})
		.catch((e) => {
			if (isDev) {
				console.log(e.response);
			}
			if (e.response.status !== 400) {
				const platform = "website";
				const location = "actions/productActions.js";
				const title = "/api/v1/category/products api error";
				const description = JSON.stringify(e.response.data);
				const flag = 1;
				errorLogging(
					platform,
					location,
					title,
					description,
					flag,
					userId
				);
			}
			dispatch({
				type: FETCH_PROCUREMENT_LIST,
				payload: {
					isLoading: false,
					hasError: true,
					response: e.response.data,
				},
			});
		});
};

export const fetchProcurementDetails = (id, userId) => {
	return async (dispatch) => {
		await clientAxios
			.get(`/admin/procurement/${id}`)
			.then((res) => {
				if (isDev) {
					console.log(res);
				}
				dispatch({
					type: FETCH_PROCUREMENT_DETAILS,
					payload: {
						isLoading: false,
						hasError: false,
						response: res.data,
					},
				});
			})
			.catch((e) => {
				if (isDev) {
					console.log(e.response);
				}
				if (e.response.status !== 400) {
					const platform = "website";
					const location = "actions/productActions.js";
					const title = "/api/v1/category/products api error";
					const description = JSON.stringify(e.response.data);
					const flag = 1;
					errorLogging(
						platform,
						location,
						title,
						description,
						flag,
						userId
					);
				}
				dispatch({
					type: FETCH_PROCUREMENT_DETAILS,
					payload: {
						isLoading: false,
						hasError: true,
						response: e.response.data,
					},
				});
			});
	};
};

export const updateProcurementList = (userId) => {
	return async (dispatch) => {
		await clientAxios
			.get("/admin/procurement")
			.then((res) => {
				if (isDev) {
					console.log(res);
				}
				dispatch({
					type: UPDATE_PROCUREMENT,
					payload: {
						isLoading: false,
						hasError: false,
						response: res.data,
					},
				});
			})
			.catch((e) => {
				if (isDev) {
					console.log(e.response);
				}
				if (e.response.status !== 400) {
					const platform = "website";
					const location = "actions/productActions.js";
					const title = "/api/v1/category/products api error";
					const description = JSON.stringify(e.response.data);
					const flag = 1;
					errorLogging(
						platform,
						location,
						title,
						description,
						flag,
						userId
					);
				}
				dispatch({
					type: UPDATE_PROCUREMENT,
					payload: {
						isLoading: false,
						hasError: true,
						response: e.response.data,
					},
				});
			});
	};
};
