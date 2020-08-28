import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers";

const initialState = {};

initialState.general = {
	appOptions: {
		isLoading: true,
		hasError: false,
	},
};

initialState.procurement = {
	procurementList: {
		isLoading: true,
		hasError: false,
		response: {},
	},
	procurementDetails: {
		isLoading: true,
		hasError: false,
		response: {},
	},
};

initialState.authorization = {
	auth: {
		isLoading: true,
		hasError: false,
		isSignedIn: false,
		user: {},
	},
	users: {
		isLoading: true,
		hasError: false,
		response: {},
	},
};

initialState.products = {
	productsList: {
		isLoading: true,
		hasError: false,
		response: {},
	},
};

initialState.notification = {
	notification: {
		hasError: false,
	},
};
const cart = "cart_pos_" + localStorage.getItem("fth_pos_cityCode");
if (localStorage.getItem(cart)) {
	initialState.cart = {
		cart: {
			isLoading: false,
			hasError: false,
			cartItems: JSON.parse(localStorage.getItem(cart)),
		},
	};
} else {
	initialState.cart = {
		cart: {
			isLoading: false,
			hasError: false,
			cartItems: [],
		},
	};
}

const middleware = [thunk];

const store = createStore(
	rootReducer,
	initialState,
	compose(
		applyMiddleware(...middleware),
		window.__REDUX_DEVTOOLS_EXTENSION__ &&
			window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

export default store;
