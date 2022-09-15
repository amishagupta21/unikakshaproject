
import ApiService from "../../services/ApiService";
import { ActionTypes } from "../constants/ActionTypes";

export const addUserEducation = (data) => {
    return async (dispatch) => {
        return await ApiService(`v1/user/profile/education`, `post`, data);
    };
};

export const editWorkExperience = (data) => {
    return async (dispatch) => {
        return await ApiService(`v1/user/profile/education`, `patch`, data);
    };
};

export const deleteExperience = (data) => {
    console.log("Data :::", data);
    return async (dispatch) => {
        return await ApiService(`v1/user/profile/education/delete`, `delete`, data);
    };
};

export const getSkills = (data) => {
    return async (dispatch) => {
        let res = await ApiService(`v1/master/skill/list`, `get`);
        if (res?.status === 200) {
            dispatch({
                type: ActionTypes.GET_SKILLS,
                payload: res?.data?.data
            });
        }

    };
};

export const getDegree = () => {
    return async (dispatch) => {
        let res = await ApiService(`v1/master/degree/list`, `get`);
        console.log("respon degree::", res);
        if (res?.status === 200) {
            dispatch({
                type: ActionTypes.GET_DEGREE,
                payload: res?.data?.data
            });
        }
    };
};

export const getFieldOfStudy = () => {
    return async (dispatch) => {
        let res = await ApiService(`v1/master/allFieldOfStudy/list`, `get`);
        if (res?.status === 200) {
            dispatch({
                type: ActionTypes.GET_FIELD_OF_STUDY,
                payload: res?.data?.data
            });
        }
    };
};

