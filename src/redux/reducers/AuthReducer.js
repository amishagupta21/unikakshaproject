import { ActionTypes } from '../constants/ActionTypes';

const initializeState = {
  isAuthenticated: false,
};
const AuthReducer = (state = initializeState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_IS_AUTHENTICATED:
      return { isAuthenticated: payload };
    default:
      return state;
  }
};

export default AuthReducer;
