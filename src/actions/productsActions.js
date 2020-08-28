import {
	FETCH_PRODUCTS,
	FETCH_PRODUCTS_LIST,
	FETCH_SEARCH_PRODUCTS,
	FETCH_PRODUCT,
} from "./types";
import { isDev, clientAxios } from "../config/config";
import { errorLogging } from "./notificationActions";

export const fetchProducts = (category, sortby, cityCode, userId) => {
	console.log(category);
	if (category === undefined) {
		category = "";
	}
	return async (dispatch) => {
		await clientAxios
			.get(
				`/api/v1/category/products?category=${category}&sortby=${sortby}&city_code=${cityCode}`
			)
			.then((res) => {
				if (isDev) {
					console.log(res);
				}
				dispatch({
					type: FETCH_PRODUCTS,
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
					type: FETCH_PRODUCTS,
					payload: {
						isLoading: false,
						hasError: true,
						response: e.response.data,
					},
				});
			});
	};
};

export const fetchProductsList = (cityCode, userId) => {
	return async (dispatch) => {
		await clientAxios
			.get(`/productslist?city_code=${cityCode}`)
			.then((res) => {
				if (isDev) {
					console.log(res);
				}
				dispatch({
					type: FETCH_PRODUCTS_LIST,
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
					const title = "/api/v1/productlist api error";
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
					type: FETCH_PRODUCTS_LIST,
					payload: {
						isLoading: false,
						hasError: true,
						response: e.response.data,
					},
				});
			});
	};
};

export const fetchSearchProducts = (search, cityCode, userId) => {
	return async (dispatch) => {
		await clientAxios
			.get(
				`/api/v1/search/products?search=${search}&city_code=${cityCode}`
			)
			.then((res) => {
				if (isDev) {
					console.log(res);
				}
				dispatch({
					type: FETCH_SEARCH_PRODUCTS,
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
					const title = "/api/v1/search/products api error";
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
					type: FETCH_SEARCH_PRODUCTS,
					payload: {
						isLoading: false,
						hasError: true,
						response: e.response.data,
					},
				});
			});
	};
};

export const fetchProduct = (product, city, userId) => {
	return async (dispatch) => {
		await clientAxios
			.get(`/api/v1/products/${product}?city_code=${city}`)
			.then((res) => {
				if (isDev) {
					console.log(res);
				}
				dispatch({
					type: FETCH_PRODUCT,
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
					const title = "/api/v1/products/productId api error";
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
					type: FETCH_PRODUCT,
					payload: {
						isLoading: false,
						hasError: true,
						response: e.response.data,
					},
				});
			});
	};
};
