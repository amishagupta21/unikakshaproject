import { ActionTypes } from "../constants/ActionTypes";

const initializeState = {
  user: {},
};
const UserReducer = (state = initializeState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_USERS:
      return { ...state, user: payload };
    case ActionTypes.SET_USERS:
      console.log("redd", payload)
      return { ...state, user: { email: payload } };
    default:
      return state;
  }
};

export default UserReducer;
