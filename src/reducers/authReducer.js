import { SIGN_IN, SIGN_OUT, FETCH_USERS_LIST } from "../actions/types";

const initialState = {
	auth: {
		isSignIn: false,
		isLoading: true,
		hasError: false,
		user: {},
	},
	users: {},
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SIGN_IN:
			return {
				...state,
				auth: action.payload,
			};
		case SIGN_OUT:
			return {
				...state,
				auth: action.payload,
			};
		case FETCH_USERS_LIST:
			return {
				...state,
				users: action.payload,
			};
		default:
			return state;
	}
}
