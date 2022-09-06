import { ActionTypes } from "../constants/ActionTypes";

export const setLoading = (value) => {
    return async (dispatch) => {
        dispatch({
            type: ActionTypes.SET_LOADING,
            payload: value,
        });
    };
};
