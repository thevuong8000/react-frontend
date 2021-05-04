import React, { createContext, useContext } from 'react';

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => (
  <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>
);

const useGlobal = () => useContext(GlobalContext);

export { GlobalProvider, useGlobal };
