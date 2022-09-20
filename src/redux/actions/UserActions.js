import ApiService from '../../services/ApiService';
import { ActionTypes } from '../constants/ActionTypes';
import { toast } from 'react-toastify';

export const getUsers = () => async dispatch => {
  const getLanRes = await ApiService(`users`, `get`);
  if (getLanRes.status === 200) {
    const data = getLanRes.data;
    dispatch({
      type: ActionTypes.GET_USERS,
      payload: { data },
    });
  }
};

export const setUsers = email => async dispatch => {
  dispatch({
    type: ActionTypes.SET_USERS,
    payload: email,
  });
};

export const getuserProfile = id => async dispatch => {
  const profileData = await ApiService(`v1/user/profile/${id}`, `get`);
  if (profileData.status === 200) {
    const data = profileData?.data?.data;
    dispatch({
      type: ActionTypes.GET_PROFILE,
      payload: { data },
    });
  }
};

export const addUserIntroduction = data => async dispatch => {
  const res = await ApiService(`v1/user/profile/general-information`, `post`, data);
  if (res.status === 201) {
    toast.success('User Information Added Sucessfully');
	 await dispatch(getuserProfile(data?.uid));
  }
};

export const editUserIntroduction = data => async dispatch => {
    const res = await ApiService(`v1/user/profile/general-information`, `patch`, data);
    if (res.status === 200) {
      toast.success('User Information Edited Sucessfully');
      await dispatch(getuserProfile(data?.uid));
    }
  };

