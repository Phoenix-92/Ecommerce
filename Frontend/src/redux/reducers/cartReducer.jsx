import { ActionTypes } from "../constants/actionTypes";

const initialState = [];
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_TO_CART:
      action.productData.quantity = 1;
      return [...state, action.productData];

    case ActionTypes.REMOVE_FROM_CART:
      return state.filter((item) => item.id !== action.payload);

    case ActionTypes.ADD_QUANTITY:
      return state.map((product) =>
        product.id === action.payload
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );

    case ActionTypes.SUB_QUANTITY:
      return state.map((product) =>
        product.id === action.payload
          ? {
              ...product,
              quantity: product.quantity !== 1 ? product.quantity - 1 : 1,
            }
          : product
      );

    case ActionTypes.EMPTY_CART:
      return [];

    default:
      return state;
  }
};

export { cartReducer };
