import { Flex, Spacer, Box } from '@chakra-ui/layout';
import { Button as ChakraButton } from '@chakra-ui/button';
import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import { ROUTE } from '@constants/routing';
import Profile from '@common/Profile/Profile';
import { TEXT_COMMON } from '@constants/text';
import { useColorMode } from '@chakra-ui/color-mode';
import { FaMoon, FaSun } from 'react-icons/fa';
import Button from '@common/Button/Button';
import { DEFAULT_SIZE } from '@constants/global';

const Header = () => {
  const location = useLocation();
  const { colorMode, toggleColorMode } = useColorMode();

  const LeftItems = () => (
    <Box
      w="max-content"
      h="100%"
      d="flex"
      flexDir="row"
      justifyContent="flex-start"
      alignItems="center"
    >
      {/* Logo */}
      <ChakraButton
        as={Link}
        to={{ pathname: ROUTE.HOME.to, state: { from: location.pathname } }}
        variant="outline"
      >
        {TEXT_COMMON.TITLE}
      </ChakraButton>
    </Box>
  );

  const RightItems = () => (
    <Flex>
      <Button onClick={toggleColorMode} size="md" variant="ghost" colorScheme="gray">
        {colorMode === 'light' ? (
          <FaMoon size={DEFAULT_SIZE.ICON} color="gray" />
        ) : (
          <FaSun size={DEFAULT_SIZE.ICON} />
        )}
      </Button>
      <Profile />
    </Flex>
  );

  return (
    <Flex boxShadow="sm" align="center" justify="space-between" h="14" p="6">
      <LeftItems />
      <Spacer />
      <RightItems />
    </Flex>
  );
};

export default Header;
