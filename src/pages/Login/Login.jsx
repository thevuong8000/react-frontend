import { Button } from '@chakra-ui/button';
import { useBoolean } from '@chakra-ui/hooks';
import { Box, Flex, Heading } from '@chakra-ui/layout';
import { InputText } from '@common/';
import { useAuth } from '@contexts/auth-provider';
import useUsers from '@hooks/useUsers';
import { isEmpty } from '@utilities/helper';
import React, { useEffect, useState } from 'react';
import { FiUser, FiLock } from 'react-icons/fi';
import { HiOutlineLogin } from 'react-icons/hi';
import { AiOutlinePlus } from 'react-icons/ai';
import { LightMode } from '@chakra-ui/color-mode';
import { TEXT_COMMON, TEXT_LOG_IN } from '@constants/text';
import ErrorMessage from '@common/ErrorMessage/ErrorMessage';

const LOGIN_INPUT_STYLE = {
  borderColor: 'gray.300',
  _placeholder: {
    color: 'gray.400'
  },
  _hover: {
    borderColor: 'gray.500'
  },
  color: 'black'
};

const username = 'username';
const password = 'password';
const DEFAULT_PAYLOAD = { [username]: '', [password]: '' };

const Login = ({ documentTitle }) => {
  const { logIn } = useAuth();
  const { createUser } = useUsers();
  const [payload, setPayload] = useState(DEFAULT_PAYLOAD);
  const [errorMessage, setErrorMessage] = useState('');

  const [isLogingIn, setIsLoginIn] = useBoolean(false);
  const [isCreating, setIsCreating] = useBoolean(false);
  const isLoading = isLogingIn || isCreating;

  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  const _isErrorInput = () => {
    if (isEmpty(payload[username]) || isEmpty(payload[password])) {
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

  const _onLogin = async (e) => {
    if (e) e.preventDefault();

    if (_isErrorInput()) return;
    setIsLoginIn.on();
    try {
      await logIn(payload);
    } catch (err) {
      setErrorMessage(err.message);
    }
    setIsLoginIn.off();
  };

  const _onCreateAccount = async () => {
    if (_isErrorInput()) return;
    setIsCreating.on();
    try {
      await createUser(payload);
      _onLogin();
    } catch (err) {
      setErrorMessage(err.message);
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
        <Heading color="black" mb="10">
          {TEXT_COMMON.APP_TITLE}
        </Heading>

        {/* Login Form */}
        <form onSubmit={_onLogin} style={{ width: '100%' }}>
          <Flex direction="column" align="center" gridGap="3">
            <InputText
              {...LOGIN_INPUT_STYLE}
              name={username}
              value={payload[username]}
              onChange={_onFieldChange}
              icon={<FiUser color="black" />}
              placeholder={TEXT_LOG_IN.USERNAME}
              isRequired
            />
            <InputText
              {...LOGIN_INPUT_STYLE}
              name={password}
              value={payload[password]}
              onChange={_onFieldChange}
              type="password"
              icon={<FiLock color="black" />}
              placeholder={TEXT_LOG_IN.PASSWORD}
              isRequired
            />
            <LightMode>
              {errorMessage ? <ErrorMessage message={errorMessage} /> : <Box mt="2" />}
              <Button
                type="submit"
                onClick={_onLogin}
                size="sm"
                w="80%"
                isDisabled={isLoading}
                rightIcon={<HiOutlineLogin size={20} />}
                isLoading={isLogingIn}
                loadingText={TEXT_LOG_IN.LOGIN}
              >
                {TEXT_LOG_IN.LOGIN}
              </Button>
              <Button
                onClick={_onCreateAccount}
                size="sm"
                w="80%"
                colorScheme="green"
                isDisabled={isLoading}
                rightIcon={<AiOutlinePlus size={20} />}
                isLoading={isCreating}
                loadingText={TEXT_LOG_IN.CREATE_ACCOUNT}
              >
                {TEXT_LOG_IN.CREATE_ACCOUNT}
              </Button>
            </LightMode>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
};

export default Login;
