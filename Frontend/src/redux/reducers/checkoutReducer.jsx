import { ActionTypes } from "../constants/actionTypes";

const initialStateOrderDetails = [];
const initialStateOrderProducts = [];

export const orderDetailsReducer = (
  state = initialStateOrderDetails,
  { type, payload }
) => {
  switch (type) {
    case ActionTypes.ADD_ORDER_DETAILS:
      return { ...state, payload };
    default:
      return state;
  }
};

export const orderProductsReducer = (
  state = initialStateOrderProducts,
  { type, payload }
) => {
  switch (type) {
    case ActionTypes.ADD_ORDER_PRODUCTS:
      return { ...state, payload };
    default:
      return state;
  }
};
