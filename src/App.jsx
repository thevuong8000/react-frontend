import { useBoolean } from '@chakra-ui/hooks';
import LoaderFull from '@common/LoaderFull/LoaderFull';
import React, { lazy, useEffect } from 'react';
import { useAuth } from './contexts/auth-provider';

const AuthenticatedPage = lazy(() => import('./pages/AuthenticatedPage/AuthenticatedPage'));
const UnauthenticatedPage = lazy(() => import('./pages/UnauthenticatedPage/UnauthenticatedPage'));

const App = () => {
  const { user, verifyToken } = useAuth();

  const [isVerified, setIsVerified] = useBoolean(false);

  const _verifyLogin = async () => {
    await verifyToken();
    setIsVerified.on();
  };

  useEffect(() => {
    _verifyLogin();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isVerified) return <LoaderFull />;

  return <>{user ? <AuthenticatedPage /> : <UnauthenticatedPage />}</>;
};

export default App;
