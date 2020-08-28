import {
	FETCH_PRODUCTS,
	FETCH_PRODUCTS_LIST,
	FETCH_SEARCH_PRODUCTS,
	FETCH_PRODUCT,
} from "../actions/types";

const initialState = {
	products: [],
	productsList: {},
	searchProducts: [],
	relatedProducts: [],
	product: [],
};

export default function (state = initialState, action) {
	switch (action.type) {
		case FETCH_PRODUCTS:
			return {
				...state,
				products: action.payload,
			};
		case FETCH_PRODUCT:
			return {
				...state,
				product: action.payload,
			};
		case FETCH_PRODUCTS_LIST:
			return {
				...state,
				productsList: action.payload,
			};
		case FETCH_SEARCH_PRODUCTS:
			return {
				...state,
				searchProducts: action.payload,
			};
		default:
			return state;
	}
}
