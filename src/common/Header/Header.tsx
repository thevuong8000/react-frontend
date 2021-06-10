import React, { FC } from 'react';
import { Flex, Spacer, Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { Link, useLocation } from 'react-router-dom';
import { ROUTE } from '@constants/routing';
import { Profile } from '@common';
import { TEXT_COMMON } from '@constants/text';
import { useColorMode } from '@chakra-ui/color-mode';
import { FaMoon, FaSun } from 'react-icons/fa';

const Header: FC = () => {
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
      <Button
        as={Link}
        to={{ pathname: ROUTE.HOME.to, state: { from: location.pathname } }}
        variant="outline"
        size="md"
      >
        {TEXT_COMMON.APP_TITLE}
      </Button>
    </Box>
  );

  const RightItems = () => (
    <Flex>
      <Button onClick={toggleColorMode} size="md" variant="ghost" colorScheme="gray">
        {colorMode === 'light' ? <FaMoon color="gray" size={20} /> : <FaSun size={20} />}
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
