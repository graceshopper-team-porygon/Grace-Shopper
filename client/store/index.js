import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import users from "./users";
import product from "./singleProduct";
import products from "./products";
import cartItems from "./cartItems";
import order from "./order";

const reducer = combineReducers({
  auth,
  users,
  product,
  products,
  cartItems,
  order,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
