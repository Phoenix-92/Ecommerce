import { ActionTypes } from "../constants/actionTypes";

export const addToCart = (productData) => {
  return {
    type: ActionTypes.ADD_TO_CART,
    productData,
  };
};

export const removeFromCart = (payload) => {
  return {
    type: ActionTypes.REMOVE_FROM_CART,
    payload,
  };
};

export const subtractQuantity = (payload) => {
  return {
    type: ActionTypes.SUB_QUANTITY,
    payload,
  };
};

export const addQuantity = (payload) => {
  return {
    type: ActionTypes.ADD_QUANTITY,
    payload,
  };
};

export const emptyCart = () => {
  return {
    type: ActionTypes.EMPTY_CART,
  };
};
