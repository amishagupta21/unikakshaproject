import { ActionTypes } from "../constants/ActionTypes";

export const setEmail = (email) => {
    return async (dispatch) => {
        dispatch({
            type: ActionTypes.SET_EMAIL,
            payload: email,
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


