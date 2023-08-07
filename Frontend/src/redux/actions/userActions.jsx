import { ActionTypes } from "../constants/actionTypes";

export const addProfile = (user) => {
  return {
    type: ActionTypes.ADD_USER,
    payload: { user },
  };
};

export const addUserId = (userID) => {
  return {
    type: ActionTypes.ADD_USERID,
    payload: userID,
  };
};

export const removeUserId = () => {
  return {
    type: ActionTypes.REMOVE_USERID,
  };
};

// export const updateProfile = (user) => {
//   return {
//     type: ActionTypes.UPDATE_USER,
//     payload: { user },
//   };
// };

// export const formSubmittionStatus = (status) => {
//   return {
//     type: ActionTypes.FORM_SUBMITION_STATUS,
//     payload: { status },
//   };
// };

export const login = (user) => {
  return {
    type: ActionTypes.LOGIN,
    payload: { user },
  };
};
