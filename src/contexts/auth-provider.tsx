import { API_PATH } from '@constants/configs';
import useApi from '@hooks/useApi';
import { isEmpty } from '@utilities/helper';
import React, { createContext, FC, useCallback, useContext, useState } from 'react';
import { IAuthContext, IAuthData, IUserInfo, IUserLogin } from 'typings/user';
import { clearLoginInfo, getLoginInfo, saveLoginInfo } from '../utilities/auth';

const EMPTY_USER = {} as IAuthData;

const DEFAULT_AUTH_CONTEXT: IAuthContext = {
  user: EMPTY_USER,
  logIn: (payload: IUserLogin) => Promise.reject(),
  logOut: () => clearLoginInfo(),
  verifyToken: () => Promise.reject()
};

const AuthContext = createContext<IAuthContext>(DEFAULT_AUTH_CONTEXT);

export const AuthProvider: FC = ({ children }) => {
  const [data, setData] = useState<IAuthData>(EMPTY_USER);
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
      setData(EMPTY_USER);
    }
  };

  const logIn = useCallback(
    async (payload: IUserLogin) => {
      const result = await apiPost<IAuthData>(API_PATH.AUTH.LOGIN, payload);
      saveLoginInfo(result);

      // Verify the token received after logging in
      verifyToken();
    },
    [apiPost]
  );

  const logOut = useCallback(() => {
    clearLoginInfo();
    setData(EMPTY_USER);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data, logIn, logOut, verifyToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
