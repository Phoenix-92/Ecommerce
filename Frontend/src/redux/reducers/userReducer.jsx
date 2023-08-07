import { ActionTypes } from "../constants/actionTypes";

const userData = {
  userID: null,
  userName: "",
  password: "",
  firstName: "",
  lastName: "",
  mobile: "",
  email: "",
  state: "",
  country: "",
  address: "",
  pincode: "",
};

export const userReducer = (state = userData, { type, payload }) => {
  switch (type) {
    // case ActionTypes.LOGIN:
    // console.log("login", action.payload.user);
    // return {
    //   ...state,
    //   profile: action.payload.user,
    //   formSubmitted: false, // after update user formsubmition reset
    // };

    case ActionTypes.ADD_USER:
      return {
        ...state,
        ...payload.user,
      };

    case ActionTypes.ADD_USERID:
      return {
        ...state,
        userID: payload,
      };

    case ActionTypes.REMOVE_USERID:
      return {
        ...state,
        userID: null,
      };
    // case ActionTypes.UPDATE_USER:
    //   return {
    //     ...state,
    //     profile: action.payload.user,
    //     formSubmitted: false, // after update user formsubmition reset
    //   };

    // case ActionTypes.FORM_SUBMITION_STATUS:
    //   return {
    //     ...state,
    //     formSubmitted: action.payload.status,
    //   };
    default:
      return state;
  }
};
