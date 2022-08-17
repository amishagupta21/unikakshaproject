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
