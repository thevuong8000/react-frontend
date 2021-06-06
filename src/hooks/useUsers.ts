import { API_PATH } from '@constants/configs';
import useApi from './useApi';

export interface IUserCreate {
  username: string;
  password: string;
}

export interface IUserChangePassword {
  currentPassword: string;
  newPassword: string;
}

export interface IUser {}

export interface IUserUpdatable {
  displayName?: string;
  email?: string;
}

const useUsers = () => {
  const { apiPost, apiPut, apiDelete } = useApi();

  const createUser = (payload: IUserCreate) => apiPost<Message>(API_PATH.USERS.CREATE, payload);

  const updateUser = (id: string, payload: IUserUpdatable) =>
    apiPost<Message>(API_PATH.USERS.ACITON(id), payload);

  const deleteUser = (id: string) => apiDelete<Message>(API_PATH.USERS.ACITON(id));

  /* payload: { current_password, new_password } */
  const changePassword = (id: string, payload: IUserChangePassword) =>
    apiPut<Message>(API_PATH.USERS.CHANGE_PASSWORD(id), payload);

  return { createUser, updateUser, deleteUser, changePassword };
};

export default useUsers;
