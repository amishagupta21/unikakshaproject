import { ActionTypes } from "../constants/ActionTypes";

const initializeState = {
  users: [],
};
const LanguageReducer = (state = initializeState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_USERS:
      return { ...state, users: payload };
    default:
      return state;
  }
};

export default LanguageReducer;
