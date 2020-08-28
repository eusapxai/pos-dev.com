import { combineReducers } from "redux";
import productsReducer from "./productsReducer";
import procurementReducer from "./procurementReducer";
import generalReducer from "./generalReducer";
import authReducer from "./authReducer";
import notificationReducer from "./notificationReducer";
import cartReducer from "./cartReducer";

export default combineReducers({
	products: productsReducer,
	general: generalReducer,
	authorization: authReducer,
	notification: notificationReducer,
	procurement: procurementReducer,
	cart: cartReducer,
});
