import React, { createContext, useContext, useState } from 'react';

const MOCK_USER = {
  name: 'katorin'
};

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [data, setData] = useState(null);

  /**
   * Log in with payload
   * @param {object} payload: { username, password }
   */
  const logIn = (payload) => {
    console.log(payload);
  };

  const logOut = () => {
    console.log('log out');
  };

  return (
    <AuthContext.Provider value={{ user: data, logIn, logOut }}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
