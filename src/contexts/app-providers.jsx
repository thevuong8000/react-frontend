import LoaderFull from '@common/LoaderFull/LoaderFull';
import React, { Suspense } from 'react';
import { AuthProvider } from './auth-provider';
import { GlobalProvider } from './global-provider';

const AppProviders = (props) => (
  <Suspense fallback={<LoaderFull />}>
    <GlobalProvider>
      <AuthProvider>{props.children}</AuthProvider>
    </GlobalProvider>
  </Suspense>
);

export default AppProviders;
