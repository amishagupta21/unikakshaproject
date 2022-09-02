import { ActionTypes } from "../constants/ActionTypes";

const initializeState = {
  user: {},
  profile: {}
};
const UserReducer = (state = initializeState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_USERS:
      return { ...state, user: payload };
    case ActionTypes.GET_PROFILE:
      return { ...state, profile: payload?.data };
    default:
      return state;
  }
};

export default UserReducer;
