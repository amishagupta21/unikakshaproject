import ApiService from "../../services/ApiService";

export const addProject = (data) => async () =>
	await ApiService(`v1/user/profile/project`, `post`, data);

export const editProject = (data) => async () =>
	await ApiService(`v1/user/profile/project`, `patch`, data);

export const deleteProject = (data) => {
	return async () =>
		await ApiService(`v1/user/profile/project/delete`, `delete`, data);
};
