import { API_PATH } from '@constants/configs';
import useApi from './useApi';

const useUsers = () => {
	const { apiPost, apiPut } = useApi();

	const createUser = (payload) => apiPost(API_PATH.USERS.ROOT, payload);

	const updateUser = (payload) => {
		console.log('update user', payload);
	};

	const deleteUser = (payload) => {
		console.log('delete user', payload);
	};

	/* payload: { current_password, new_password } */
	const changePassword = (id, payload) => apiPut(API_PATH.USERS.CHANGE_PASSWORD(id), payload);

	return { createUser, updateUser, deleteUser, changePassword };
};

export default useUsers;
