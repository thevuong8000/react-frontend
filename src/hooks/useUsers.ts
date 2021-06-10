import { API_PATH } from '@constants/configs';
import { IUserChangePassword, IUserCreate, IUserUpdatable } from 'typings/user';
import useApi from './useApi';

const useUsers = () => {
  const { apiPost, apiPatch, apiDelete } = useApi();

  const createUser = (payload: IUserCreate) => apiPost<Message>(API_PATH.USERS.CREATE, payload);

  const updateUser = (id: string, payload: IUserUpdatable) =>
    apiPost<Message>(API_PATH.USERS.ACITON(id), payload);

  const deleteUser = (id: string) => apiDelete<Message>(API_PATH.USERS.ACITON(id));

  /* payload: { current_password, new_password } */
  const changePassword = (id: string, payload: IUserChangePassword) =>
    apiPatch<Message>(API_PATH.USERS.CHANGE_PASSWORD(id), payload);

  return { createUser, updateUser, deleteUser, changePassword };
};

export default useUsers;
