import { ActionTypes } from '../constants/ActionTypes';

export const openToaster = (value) => async (dispatch) => {
  dispatch({
    type: ActionTypes.OPEN_TOASTER,
    payload: value,
  });
};
