import { API_PATH } from '@constants/configs';
import useApi from '@hooks/useApi';
import { clearLoginInfo, getLoginInfo, isEmpty, saveLoginInfo } from '@utilities/helper';
import React, { Context, createContext, FC, useCallback, useContext, useState } from 'react';

export interface IUserLogin {
  username: string;
  password: string;
}

export interface IAuthContext {
  user: object;

  /**
   * Login with payload
   * @param payload username and password
   */
  logIn(payload: IUserLogin): Promise<void>;

  /**
   * Log out and clear stored user data
   */
  logOut(): void;

  /**
   * Verify stored access token
   */
  verifyToken(): Promise<void>;
}

const AuthContext: Context<IAuthContext> = createContext(null);

export const AuthProvider: FC = ({ children }) => {
  const [data, setData] = useState(null);
  const { apiPost } = useApi();

  /* Verify if memoized user data is still valid */
  const verifyToken = async () => {
    const storedInfo = getLoginInfo();

    // Nothing to verify
    if (isEmpty(storedInfo)) return;

    const { id } = storedInfo;
    try {
      await apiPost(API_PATH.AUTH.TEST_TOKEN, { id });
      setData(storedInfo);
    } catch (error) {
      setData(null);
    }
  };

  /**
   * Log in with payload
   * @param {object} payload: { username, password }
   */
  const logIn = useCallback(
    async (payload) => {
      const result = await apiPost(API_PATH.AUTH.LOGIN, payload);
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
