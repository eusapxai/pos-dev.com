import { SIGN_IN, SIGN_OUT, FETCH_USERS_LIST } from "./types";
import Cookie from "js-cookie";
import { isDev, clientAxios } from "../config/config";

export const signIn = () => (dispatch) => {
	const token = Cookie.get("fth_pos_token");
	if (token !== "") {
		clientAxios.defaults.headers.common[
			"Authorization"
		] = `Bearer ${token}`;
		clientAxios
			.post("/admin/user")
			.then((res) => {
				if (isDev) {
					console.log(res);
				}
				dispatch({
					type: SIGN_IN,
					payload: {
						isLoading: false,
						hasError: false,
						isSignedIn: true,
						user: res.data.data.user,
						accessToken: token,
					},
				});
			})
			.catch((e) => {
				if (isDev) {
					console.log(e.response);
				}
				// cookie.remove("fth_pos_token");
				dispatch({
					type: SIGN_OUT,
					payload: {
						isLoading: false,
						isSignedIn: false,
						hasError: true,
						user: {},
						accessToken: null,
					},
				});
			});
	} else {
		dispatch({
			type: SIGN_OUT,
			payload: {
				isLoading: false,
				isSignedIn: false,
				hasError: true,
				user: {},
				accessToken: null,
			},
		});
	}
};

export const signOut = () => (dispatch) => {
	const token = Cookie.get("fth_pos_token");
	if (token) {
		clientAxios.defaults.headers.common[
			"Authorization"
		] = `Bearer ${token}`;
		clientAxios
			.post("/auth/logout")
			.then((res) => {
				if (isDev) {
					console.log(res);
				}
				Cookie.remove("fth_pos_token");
				dispatch({
					type: SIGN_OUT,
					payload: {
						isLoading: false,
						isSignedIn: false,
						hasError: false,
						user: {},
						accessToken: null,
					},
				});
			})
			.catch((e) => {
				if (isDev) {
					console.log(e.response);
				}
				dispatch({
					type: SIGN_OUT,
					payload: {
						isLoading: false,
						isSignedIn: false,
						hasError: true,
						user: {},
						accessToken: null,
					},
				});
			});
	} else {
		dispatch({
			type: SIGN_OUT,
			payload: {
				isLoading: false,
				isSignedIn: false,
				hasError: true,
				user: {},
				accessToken: null,
			},
		});
	}
};

export const getUsers = () => (dispatch) => {
	const token = Cookie.get("fth_pos_token");
	if (token !== "") {
		clientAxios.defaults.headers.common[
			"Authorization"
		] = `Bearer ${token}`;
		clientAxios
			.get("/admin/users")
			.then((res) => {
				if (isDev) {
					console.log(res);
				}
				dispatch({
					type: FETCH_USERS_LIST,
					payload: {
						isLoading: false,
						hasError: false,
						response: res.data,
					},
				});
			})
			.catch((e) => {
				if (isDev) {
					console.log(e.response);
				}
				dispatch({
					type: FETCH_USERS_LIST,
					payload: {
						isLoading: false,
						hasError: true,
						response: {},
					},
				});
			});
	} else {
		dispatch({
			type: SIGN_OUT,
			payload: {
				isLoading: false,
				isSignedIn: false,
				user: {},
				accessToken: null,
			},
		});
	}
};
