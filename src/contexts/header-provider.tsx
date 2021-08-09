import React, { FC, createContext, useContext, useState } from 'react';

interface IHeaderContext {
  HeaderFunctions: FC;
  setHeaderFunctions: React.Dispatch<React.SetStateAction<React.FC<{}>>>;
}

const DEFAULT_HEADER_CONTEXT: IHeaderContext = {
  HeaderFunctions: () => null,
  setHeaderFunctions: () => {}
};

const HeaderContext = createContext<IHeaderContext>(DEFAULT_HEADER_CONTEXT);

export const HeaderProvider: FC = ({ children }) => {
  const [HeaderFunctions, setHeaderFunctions] = useState<FC>(() => null);
  return (
    <HeaderContext.Provider value={{ HeaderFunctions, setHeaderFunctions }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = () => useContext(HeaderContext);
