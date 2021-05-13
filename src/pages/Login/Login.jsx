import { Button } from '@chakra-ui/button';
import { useBoolean } from '@chakra-ui/hooks';
import { Box, Flex, Heading } from '@chakra-ui/layout';
import { InputText } from '@common/';
import { useAuth } from '@contexts/auth-provider';
import { isEmpty } from '@utilities/helper';
import React, { useEffect, useState } from 'react';
import { FiUser, FiLock } from 'react-icons/fi';

const DEFAULT_PAYLOAD = { username: '', password: '' };
const Login = ({ documentTitle }) => {
  const { logIn } = useAuth();
  const [payload, setPayload] = useState(DEFAULT_PAYLOAD);
  const [errorMessage, setErrorMessage] = useState('');

  const [isLogingIn, setIsLoginIn] = useBoolean(false);
  const [isCreating, setIsCreating] = useBoolean(false);
  const isLoading = isLogingIn || isCreating;

  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  const _isErrorInput = () => {
    if (isEmpty(payload.username) || isEmpty(payload.password)) {
      setErrorMessage('username and password can not be empty!');
      return true;
    }
    return false;
  };

  const _onFieldChange = (e) => {
    // Hide errorMessage if make change
    if (errorMessage) setErrorMessage('');

    const { name: field, value } = e.target;
    setPayload((prevPayload) => ({ ...prevPayload, [field]: value }));
  };

  const _onSubmit = (e) => {
    e.preventDefault();
    if (_isErrorInput()) return;
    setIsLoginIn.on();
    try {
      logIn(payload);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoginIn.off();
    }
  };

  const _onCreateAccount = () => {
    if (_isErrorInput()) return;
    setIsCreating.on();
    try {
      console.log('create account with', payload);
    } catch (err) {
      console.log(err);
    } finally {
      setIsCreating.off();
    }
  };

  return (
    <Flex
      w="100vw"
      h="100vh"
      justify="center"
      align="center"
      bgSize="cover"
      bgGradient="linear(to-r, #37a785, #05768e)"
    >
      {/* Main Form */}
      <Flex
        align="center"
        direction="column"
        justify="center"
        bgGradient="linear(to-br, gray.50, gray.300)"
        borderRadius="md"
        p="10"
        w="30rem"
      >
        {/* Title */}
        <Heading mb="10">LOG IN</Heading>
        <form onSubmit={_onSubmit} style={{ width: '100%' }}>
          <Flex direction="column" align="center" gridGap="3">
            <InputText
              name="username"
              size="sm"
              value={payload.username}
              onChange={_onFieldChange}
              icon={<FiUser />}
              placeholder="username"
              isRequired
            />
            <InputText
              name="password"
              size="sm"
              value={payload.password}
              onChange={_onFieldChange}
              type="password"
              icon={<FiLock />}
              placeholder="password"
              isRequired
            />
            <Button
              type="submit"
              onClick={_onSubmit}
              size="sm"
              w="80%"
              mt="8"
              isDisabled={isLoading}
            >
              Login
            </Button>
            <Button
              onClick={_onCreateAccount}
              size="sm"
              w="80%"
              colorScheme="green"
              isDisabled={isLoading}
            >
              Create Account
            </Button>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
};

export default Login;
