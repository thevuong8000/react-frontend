import { Flex, Spacer, Link as ChakraLink, Box } from '@chakra-ui/layout';
import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import { ROUTE } from '@constants/routing';
import { Image } from '@chakra-ui/image';
import Profile from '@common/Profile/Profile';

const Header = () => {
  const location = useLocation();

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
      <ChakraLink
        as={Link}
        w="10rem"
        to={{ pathname: ROUTE.HOME, state: { from: location.pathname } }}
      >
        <Image
          objectFit="contain"
          maxW="100%"
          objectPosition="center"
          alt="Logo"
          src="/imgs/logo.jpg"
        />
      </ChakraLink>
    </Box>
  );

  const RightItems = () => <Profile />;

  return (
    <Flex boxShadow="sm" align="center" justify="space-between">
      <LeftItems />
      <Spacer />
      <RightItems />
    </Flex>
  );
};

export default Header;
