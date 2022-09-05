import { ActionTypes } from "../constants/ActionTypes";

export const setEmail = (email) => {
    return async (dispatch) => {
        dispatch({
            type: ActionTypes.SET_EMAIL,
            payload: email,
        });
    };
};
export const clearEmail = () => {
    return async (dispatch) => {
        dispatch({
            type: ActionTypes.CLEAR_EMAIL,
        });
    };
};

export const setMobileNumber = (number) => {
    return async (dispatch) => {
        dispatch({
            type: ActionTypes.SET_MOBILENUMBER,
            payload: number,
        });
    };
};


