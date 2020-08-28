import {
	ADD_TO_CART,
	REMOVE_FROM_CART,
	UPDATE_CART,
	DELETE_CART,
} from "./types";
import { errorLogging } from "./notificationActions";
import { isDev, clientAxios } from "../config//config";

export const addToCart = (cart, productId, qty, cityCode, userid) => (
	dispatch
) => {
	clientAxios
		.get(`/cart/products/${productId}`)
		.then((res) => {
			if (isDev) {
				console.log(res);
			}
			const cartItems = cart.slice();
			let productAlreadyInCart = false;
			if (cartItems.length > 0) {
				cartItems.forEach((item) => {
					if (item.productId === productId) {
						productAlreadyInCart = true;
						item.quantity = parseInt(qty);
					}
				});
			}

			if (!productAlreadyInCart) {
				cartItems.push({
					productId: productId,
					quantity: parseInt(qty),
					productNameEn: res.data.data.productNameEn,
					productNameUr: res.data.data.productNameUr,
					unit: res.data.data.productUnit.unitEn,
				});
			}
			localStorage.setItem(
				"cart_pos_" + cityCode,
				JSON.stringify(cartItems)
			);

			return dispatch({
				type: ADD_TO_CART,
				payload: {
					isLoading: false,
					hasError: true,
					cartItems: cartItems,
				},
			});
		})
		.catch((e) => {
			if (isDev) {
				console.log(e.response);
			}
			const platform = "website";
			const description = JSON.stringify(e.response.data);
			errorLogging(
				platform,
				"actions/cartActions",
				"addToCart function error",
				description,
				1,
				userid
			);
			return dispatch({
				type: ADD_TO_CART,
				payload: {
					isLoading: false,
					hasError: true,
					cartItems: cart,
				},
			});
		});
};

export const removeFromCart = (items, productId, cityCode, userid) => (
	dispatch
) => {
	try {
		const cartItems = items
			.slice()
			.filter((elm) => elm.productId !== productId);
		localStorage.setItem("cart_pos_" + cityCode, JSON.stringify(cartItems));
		return dispatch({
			type: REMOVE_FROM_CART,
			payload: {
				isLoading: false,
				hasError: false,
				cartItems: cartItems,
			},
		});
	} catch (error) {
		const platform = "website";
		const description = error.toString();
		errorLogging(
			platform,
			"actions/cartActions",
			"removeFromCart function error",
			description,
			1,
			userid
		);
		return dispatch({
			type: REMOVE_FROM_CART,
			payload: {
				isLoading: false,
				hasError: true,
				cartItems: items,
			},
		});
	}
};

export const updateCart = (items, productId, qty, cityCode, userid) => (
	dispatch
) => {
	try {
		const cartItems = items.slice();
		cartItems.forEach((item) => {
			if (item.productId === parseInt(productId)) {
				item.quantity = parseInt(qty);
			}
		});
		localStorage.setItem("cart_pos_" + cityCode, JSON.stringify(cartItems));
		return dispatch({
			type: UPDATE_CART,
			payload: {
				isLoading: false,
				hasError: false,
				cartItems: cartItems,
			},
		});
	} catch (error) {
		const platform = "website";
		const description = error.toString();
		errorLogging(
			platform,
			"actions/cartActions",
			"updateCart function error",
			description,
			1,
			userid
		);
		return dispatch({
			type: UPDATE_CART,
			payload: {
				isLoading: false,
				hasError: true,
				cartItems: items,
			},
		});
	}
};

export const deleteCart = (cityCode) => (dispatch) => {
	localStorage.removeItem("cart_pos_" + cityCode);
	return dispatch({
		type: DELETE_CART,
		payload: {
			isLoading: false,
			hasError: false,
			cartItems: [],
		},
	});
};
