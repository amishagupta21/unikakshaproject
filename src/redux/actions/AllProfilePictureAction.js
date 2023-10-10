import { ActionTypes } from '../constants/ActionTypes';

export const allProfilePicture = (profilePic) => async (dispatch) => {
  dispatch({
    type: ActionTypes.ALL_PROFILE_PICTURE,
    payload: value,
  });
};

export const profileName = (profileName) => async (dispatch) => {
  dispatch({
    type: ActionTypes.PROFILE_NAME,
    payload: value,
  });
};
