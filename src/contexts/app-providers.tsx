import LoaderFull from '@common/LoaderFull/LoaderFull';
import React, { FC, Suspense } from 'react';
import { AuthProvider } from './auth-provider';
import { GlobalProvider } from './global-provider';

const AppProviders: FC = ({ children }) => (
  <Suspense fallback={<LoaderFull />}>
    <GlobalProvider>
      <AuthProvider>{children}</AuthProvider>
    </GlobalProvider>
  </Suspense>
);

export default AppProviders;
