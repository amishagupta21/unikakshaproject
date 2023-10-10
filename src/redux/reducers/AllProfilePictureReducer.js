import { ActionTypes } from '../constants/ActionTypes';

const initializeState = {
  allProfilePicture: '',
  personalDetail: [],
};
const AllProfilePictureReducer = (state = initializeState, { type, payload }) => {
  switch (type) {
    case ActionTypes.ALL_PROFILE_PICTURE:
      return { ...state, allProfilePicture: payload };
    case ActionTypes.PROFILE_NAME:
      return { ...state, personalDetail: payload };
    default:
      return state;
  }
};

export default AllProfilePictureReducer;
