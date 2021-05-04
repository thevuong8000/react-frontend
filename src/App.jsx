import React, { lazy } from 'react';
import { useAuth } from './contexts/auth-provider';

const AuthenticatedPage = lazy(() => import('./pages/AuthenticatedPage/AuthenticatedPage'));
const UnauthenticatedPage = lazy(() => import('./pages/UnauthenticatedPage/UnauthenticatedPage'));

const App = () => {
  const { user } = useAuth();
  return <>{user ? <AuthenticatedPage /> : <UnauthenticatedPage />}</>;
};

export default App;
