import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
import { productReducer, selectedProductsReducer } from "./productReducer";

const reducers = combineReducers({
  allProducts: productReducer,
  product: selectedProductsReducer,
  items: cartReducer,
});

export default reducers;
