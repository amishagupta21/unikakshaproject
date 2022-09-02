import ApiService from "../../services/ApiService";
import { ActionTypes } from "../constants/ActionTypes";

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
    console.log();
    if (profileData.status === 200) {
      let data = profileData?.data?.data;
      dispatch({
        type: ActionTypes.GET_PROFILE,
        payload: { data },
      });
    }
  };
};