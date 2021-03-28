import { combineReducers } from "redux";
import itemReducer from "./cartItems";
import productReducer from "./products";
import customerReducer from "./customers";
import userReducer from "./auth";
import clientsReducer from "./cartClient";

export default combineReducers({
  items: itemReducer,
  products: productReducer,
  customers: customerReducer,
  user: userReducer,
  clients: clientsReducer,
});
