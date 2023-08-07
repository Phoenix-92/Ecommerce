import { ActionTypes } from "../constants/actionTypes";

export const addOrderDetails = (orderData) => {
  return {
    type: ActionTypes.ADD_ORDER_DETAILS,
    orderData,
  };
};

export const addOrderProducts = (payload) => {
  return {
    type: ActionTypes.ADD_ORDER_PRODUCTS,
    payload,
  };
};
