import React from 'react';
import { Text } from '@chakra-ui/layout';
import { useAuth } from './contexts/auth-provider';

const App = () => {
  const { user } = useAuth();
  return <Text>Hello {user.name}</Text>;
};

export default App;
