import axios from "axios";
// import Cookie from "js-cookie";

// const token = Cookie.get("fth_pos_token");
export const isDev = true;

export const clientAxios = axios.create({
	baseURL: "http://larareact-dev.com/api",
	timeout: 5000,
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
		// Authorization: `Bearer ${token}`,
		// "Content-Type": "application/json",
	},
});
