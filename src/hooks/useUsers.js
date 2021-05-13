const useUsers = () => {
	const createUser = (payload) => {
		console.log('create user', payload);
	};

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
