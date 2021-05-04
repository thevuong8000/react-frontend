import React, { Suspense } from 'react';
import { AuthProvider } from './auth-provider';
import { GlobalProvider } from './global-provider';

const AppProviders = (props) => (
  <Suspense fallback={null}>
    <GlobalProvider>
      <AuthProvider>{props.children}</AuthProvider>
    </GlobalProvider>
  </Suspense>
);

export default AppProviders;
