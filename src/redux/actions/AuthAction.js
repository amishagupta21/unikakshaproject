import { ActionTypes } from '../constants/ActionTypes';

export const setIsAuthenticated = (value) => async (dispatch) => {
  localStorage.setItem('isAuthenticated', value);
  dispatch({
    type: ActionTypes.SET_IS_AUTHENTICATED,
    payload: value,
  });
};
