import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
import { productReducer, selectedProductsReducer } from "./productReducer";
import { userReducer } from "./userReducer";
import { orderDetailsReducer, orderProductsReducer } from "./checkoutReducer";
const reducers = combineReducers({
  allProducts: productReducer,
  product: selectedProductsReducer,
  items: cartReducer,
  user: userReducer,
  orderDetails: orderDetailsReducer,
  orderProducts: orderProductsReducer,
});

export default reducers;
