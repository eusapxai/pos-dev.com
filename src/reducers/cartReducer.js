import {
	ADD_TO_CART,
	REMOVE_FROM_CART,
	UPDATE_CART,
	DELETE_CART,
	CART_MODAL,
} from "../actions/types";

const initialState = {
	modal: {},
	cart: [],
};

export default function (state = initialState, action) {
	switch (action.type) {
		case ADD_TO_CART:
			return {
				...state,
				cart: action.payload,
			};
		case UPDATE_CART:
			return {
				...state,
				cart: action.payload,
			};
		case REMOVE_FROM_CART:
			return {
				...state,
				cart: action.payload,
			};
		case DELETE_CART:
			return {
				...state,
				cart: action.payload,
			};
		case CART_MODAL:
			return {
				...state,
				modal: {
					showCartModal: action.payload.status,
					product: action.payload.product,
				},
			};
		default:
			return state;
	}
}
