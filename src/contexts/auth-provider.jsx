import { API_PATH } from '@constants/configs';
import useApi from '@hooks/useApi';
// import { saveLoginInfo } from '@utilities/helper';
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const { apiPost } = useApi();

  /**
   * Log in with payload
   * @param {object} payload: { username, password }
   */
  const logIn = async (payload) => {
    try {
      const result = await apiPost(API_PATH.USERS.VERIFY, payload);
      // saveLoginInfo(result);
      setData(result);
    } catch (err) {
      console.log(err);
    }
  };

  const logOut = () => {
    setData(null);
  };

  return (
    <AuthContext.Provider value={{ user: data, logIn, logOut }}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
