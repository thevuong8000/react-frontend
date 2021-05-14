import { API_PATH } from '@constants/configs';
import useApi from '@hooks/useApi';
import { clearLoginInfo, getLoginInfo, saveLoginInfo } from '@utilities/helper';
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const { apiPost } = useApi();

  useEffect(() => {
    const storedInfo = getLoginInfo();

    // eslint-disable-next-line no-use-before-define
    logIn(storedInfo);
  }, []);

  /**
   * Log in with payload
   * @param {object} payload: { username, password }
   */
  const logIn = async (payload) => {
    try {
      await apiPost(API_PATH.USERS.VERIFY, payload);
      saveLoginInfo(payload);
      setData(payload);
    } catch (err) {
      console.log(err);
    }
  };

  const logOut = () => {
    clearLoginInfo();
    setData(null);
  };

  return (
    <AuthContext.Provider value={{ user: data, logIn, logOut }}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
