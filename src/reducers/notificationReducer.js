import { APP_ERROR_NOTIFICATION } from "../actions/types";

const initialState = {
	notification: {
		hasError: false,
	},
};

export default function (state = initialState, action) {
	switch (action.type) {
		case APP_ERROR_NOTIFICATION:
			return {
				...state,
				notification: {
					hasError: action.payload,
				},
			};
		default:
			return state;
	}
}
