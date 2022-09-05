import { ActionTypes } from "../constants/ActionTypes";

const initializeState = {
  mobileNumber: "",
  email: ""
};
const AuthReducer = (state = initializeState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_EMAIL:
      return { ...state, email: payload };
    case ActionTypes.CLEAR_EMAIL:
      return { ...state, email: "" };
    case ActionTypes.SET_MOBILENUMBER:
      console.log("mobileNumber :::", payload)
      return { ...state, mobileNumber: payload };
    default:
      return state;
  }
};

export default AuthReducer;
