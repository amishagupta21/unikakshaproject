
import ApiService from "../../services/ApiService";

export const addWorkExperience = (data) => {
    return async (dispatch) => {
        return await ApiService(`v1/user/profile/work-experience`, `post`, data);
    };
};

export const editWorkExperience = (data) => {
    return async (dispatch) => {
        return await ApiService(`v1/user/profile/work-experience`, `patch`, data);
    };
};

export const deleteExperience = (data) => {
    console.log("Data :::", data);
    return async (dispatch) => {
        return await ApiService(`v1/user/profile/work-experience/delete`, `delete`, data);
    };
};


