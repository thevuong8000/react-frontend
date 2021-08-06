import { useBoolean } from '@chakra-ui/hooks';
import { LoaderFull } from '@common';
import React, { FC, lazy, useEffect } from 'react';
import { useAuth } from './contexts/auth-provider';
import { APP_CONFIG } from './constants/configs';

const AuthenticatedPage = lazy(() => import('./pages/AuthenticatedPage/AuthenticatedPage'));
const UnauthenticatedPage = lazy(() => import('./pages/UnauthenticatedPage/UnauthenticatedPage'));

const App: FC = () => {
  // Omit authentication if standalone
  if (APP_CONFIG.IS_STANDALONE) return <AuthenticatedPage />;

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

  return <>{user.userId ? <AuthenticatedPage /> : <UnauthenticatedPage />}</>;
};

export default App;
