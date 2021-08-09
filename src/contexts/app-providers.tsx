import LoaderFull from '@common/LoaderFull/LoaderFull';
import React, { FC, Suspense } from 'react';
import { AuthProvider } from './auth-provider';
import { GlobalProvider } from './global-provider';
import { HeaderProvider } from './header-provider';

const AppProviders: FC = ({ children }) => (
  <Suspense fallback={<LoaderFull />}>
    <GlobalProvider>
      <AuthProvider>
        <HeaderProvider>{children}</HeaderProvider>
      </AuthProvider>
    </GlobalProvider>
  </Suspense>
);

export default AppProviders;
