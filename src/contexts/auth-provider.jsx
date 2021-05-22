import { API_PATH } from '@constants/configs';
import useApi from '@hooks/useApi';
import { clearLoginInfo, getLoginInfo, saveLoginInfo } from '@utilities/helper';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const { apiPost } = useApi();

  /* Verify the access_token with user id */
  useEffect(() => {
    const storedInfo = getLoginInfo();
    const { id, access_token } = storedInfo;
    apiPost(API_PATH.AUTH.TEST_TOKEN, { id, access_token }).then(() => setData(storedInfo));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <AuthContext.Provider value={{ user: data, logIn, logOut }}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
