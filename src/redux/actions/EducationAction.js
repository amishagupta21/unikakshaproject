
import ApiService from '../../services/ApiService';

export const addEducation = data => async () => await ApiService(`v1/user/profile/education`, `post`, data);

export const editEducation = data => async () => await ApiService(`v1/user/profile/education`, `patch`, data);

export const deleteEducation = data => {
  console.log('Data hhh :::', data);
  return async () => await ApiService(`v1/user/profile/education/delete`, `delete`, data);
};


