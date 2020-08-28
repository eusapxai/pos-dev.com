import { FETCH_APP_OPTIONS } from "./types";
import { isDev, apiBaseUrl } from "../config/config";
import axios from "axios";

export const fetchAppOptions = () => {
	return async (dispatch) => {
		await axios
			.get("http://larareact-dev.com/api/v1/web/options")
			.then((res) => {
				isDev ? console.log(res) : "";
				dispatch({
					type: FETCH_APP_OPTIONS,
					payload: {
						isLoading: false,
						hasError: false,
						response: res.data,
					},
				});
			})
			.catch((e) => {
				isDev ? console.log(e.response) : "";
				dispatch({
					type: FETCH_APP_OPTIONS,
					payload: {
						isLoading: false,
						hasError: true,
						response: e.response.data,
					},
				});
			});
	};
};
