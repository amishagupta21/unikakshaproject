import ApiService from "../../services/ApiService";
import { ActionTypes } from "../constants/ActionTypes";
import { toast } from "react-toastify";

export const getUsers = () => {
  return async (dispatch) => {
    let getLanRes = await ApiService(`users`, `get`);
    if (getLanRes.status === 200) {
      let data = getLanRes.data;
      dispatch({
        type: ActionTypes.GET_USERS,
        payload: { data },
      });
    }
  };
};

export const setUsers = (email) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.SET_USERS,
      payload: email,
    });
  };
};

export const getuserProfile = (id) => {
  return async (dispatch) => {
    let profileData = await ApiService(`v1/user/profile/${id}`, `get`);
    if (profileData.status === 200) {
      let data = profileData?.data?.data;
      dispatch({
        type: ActionTypes.GET_PROFILE,
        payload: { data },
      });
    }
  };
};

export const addUserIntroduction = (data) => {
  return async (dispatch) => {
    let res = await ApiService(`v1/user/profile/general-information`, `patch`, data);
    if (res.status === 200) {
      toast("User Information Added Sucessfully")
    }
  };
};


