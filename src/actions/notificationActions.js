import { APP_ERROR_NOTIFICATION } from "./types";
import { isDev } from "../config/config";
import axios from "axios";

export const errorNotify = (bol) => (dispatch) => {
	return dispatch({
		type: APP_ERROR_NOTIFICATION,
		payload: bol,
	});
};

export const errorLogging = (
	platform,
	location,
	title,
	description,
	flag,
	userid
) => {
	const errors = {
		platform: platform,
		userid: userid,
		location: location,
		title: title,
		description: description,
		flag: flag,
	};
	axios
		.post("/api/v1/error/notification", errors)
		.then((res) => {
			if (isDev) {
				console.log(res);
			}
			return true;
		})
		.catch((e) => {
			if (isDev) {
				console.log(e.response);
			}
			return false;
		});
};
