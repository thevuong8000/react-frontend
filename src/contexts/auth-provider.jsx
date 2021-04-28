import React, { createContext, useContext, useState } from 'react';

const MOCK_USER = {
  name: 'katorin'
};

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [data, setData] = useState(MOCK_USER);

  const logIn = () => {
    console.log('log in');
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
