
import ApiService from '../../services/ApiService';

export const addWorkExperience = data => async () => await ApiService(`v1/user/profile/work-experience`, `post`, data);

export const editWorkExperience = data => async () => await ApiService(`v1/user/profile/work-experience`, `patch`, data);

export const deleteExperience = data => {
  console.log('Data :::', data);
  return async () => await ApiService(`v1/user/profile/work-experience/delete`, `delete`, data);
};


