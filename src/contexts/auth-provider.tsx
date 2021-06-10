import { API_PATH } from '@constants/configs';
import useApi from '@hooks/useApi';
import { isEmpty } from '@utilities/helper';
import React, { createContext, FC, useCallback, useContext, useState } from 'react';
import { IAuthContext, IAuthData, IUserInfo, IUserLogin } from 'typings/user';
import { clearLoginInfo, getLoginInfo, saveLoginInfo } from '../utilities/auth';

const DEFAULT_AUTH_CONTEXT = {
  user: null,
  logIn: (payload: IUserLogin) => Promise.reject(),
  logOut: () => clearLoginInfo(),
  verifyToken: () => Promise.reject()
};

const AuthContext = createContext<IAuthContext>(DEFAULT_AUTH_CONTEXT);

export const AuthProvider: FC = ({ children }) => {
  const [data, setData] = useState<Nullable<IAuthData>>(null);
  const { apiPost } = useApi();

  /* Verify if memoized user data is still valid */
  const verifyToken = async () => {
    const storedInfo = getLoginInfo();

    // Nothing to verify
    if (isEmpty(storedInfo)) return;

    try {
      const info = await apiPost<IUserInfo>(API_PATH.AUTH.TEST_TOKEN);
      setData({ ...storedInfo, ...info });
    } catch (error) {
      setData(null);
    }
  };

  const logIn = useCallback(
    async (payload: IUserLogin) => {
      const result = await apiPost<IAuthData>(API_PATH.AUTH.LOGIN, payload);
      saveLoginInfo(result);
      setData(result);
    },
    [apiPost]
  );

  const logOut = useCallback(() => {
    clearLoginInfo();
    setData(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data, logIn, logOut, verifyToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
