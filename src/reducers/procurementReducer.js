import {
	FETCH_PROCUREMENT_LIST,
	UPDATE_PROCUREMENT,
	FETCH_PROCUREMENT_DETAILS,
} from "../actions/types";

const initialState = {
	procurementList: {},
	procurementUpdate: {},
	procurementDetails: {},
};

export default function (state = initialState, action) {
	switch (action.type) {
		case FETCH_PROCUREMENT_LIST:
			return {
				...state,
				procurementList: action.payload,
			};
		case FETCH_PROCUREMENT_DETAILS:
			return {
				...state,
				procurementDetails: action.payload,
			};
		case UPDATE_PROCUREMENT:
			return {
				...state,
				procurementUpdate: action.payload,
			};
		default:
			return state;
	}
}
