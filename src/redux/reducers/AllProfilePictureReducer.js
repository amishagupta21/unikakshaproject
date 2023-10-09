import { ActionTypes } from '../constants/ActionTypes';

const initializeState = {
  allProfilePicture: '',
};
const AllProfilePictureReducer = (state = initializeState, { type, payload }) => {
  switch (type) {
    case ActionTypes.ALL_PROFILE_PICTURE:
      return { allProfilePicture: payload };
    default:
      return state;
  }
};

export default AllProfilePictureReducer;
