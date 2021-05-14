import { API_PATH } from '@constants/configs';
import useApi from './useApi';

const useUsers = () => {
	const { apiPost } = useApi();

	const createUser = (payload) => apiPost(API_PATH.USERS.ROOT, payload);

	const updateUser = (payload) => {
		console.log('update user', payload);
	};

	const deleteUser = (payload) => {
		console.log('delete user', payload);
	};

	const updatePassword = ({ id, password }) => {
		console.log('update password', id, password);
	};

	return { createUser, updateUser, deleteUser, updatePassword };
};

export default useUsers;
