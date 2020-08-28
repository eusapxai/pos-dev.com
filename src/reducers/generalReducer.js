import { FETCH_APP_OPTIONS } from "../actions/types";

const initialState = {
	appOptions: [],
};

export default function (state = initialState, action) {
	switch (action.type) {
		case FETCH_APP_OPTIONS:
			return {
				...state,
				appOptions: action.payload,
			};
		default:
			return state;
	}
}
