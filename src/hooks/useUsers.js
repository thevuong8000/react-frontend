import { API_PATH } from '@constants/configs';
import useApi from './useApi';

const useUsers = () => {
	const { apiPost, apiPut, apiDelete } = useApi();

	const createUser = (payload) => apiPost(API_PATH.USERS.CREATE, payload);

	const updateUser = (id, payload) => apiPost(API_PATH.USERS.ACITON(id), payload);

	const deleteUser = (id) => apiDelete(API_PATH.USERS.ACITON(id));

	/* payload: { current_password, new_password } */
	const changePassword = (id, payload) => apiPut(API_PATH.USERS.CHANGE_PASSWORD(id), payload);

	return { createUser, updateUser, deleteUser, changePassword };
};

export default useUsers;
