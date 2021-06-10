import React, { FC, Context, createContext, useContext } from 'react';

const GlobalContext: Context<object> = createContext(null);

export const GlobalProvider: FC = ({ children }) => (
  <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>
);

export const useGlobal = () => useContext(GlobalContext);
