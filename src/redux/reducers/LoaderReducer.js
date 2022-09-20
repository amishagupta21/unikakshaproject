import { ActionTypes } from '../constants/ActionTypes';

const initializeState = {
  isLoading: false,
};
const LoaderReducer = (state = initializeState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_LOADING:
      return { isLoading: payload };
    default:
      return state;
  }
};

export default LoaderReducer;
