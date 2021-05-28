import React from 'react';
import { Flex, Spinner } from '@chakra-ui/react';

const LoaderFull = () => (
  <Flex
    height="100vh"
    width="100vw"
    left="0"
    overflow="hidden"
    position="fixed"
    top="0"
    align="center"
    justify="center"
    bgGradient="linear(to-br, teal.500, teal.800)"
    bgSize="cover"
  >
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.400"
      w="5rem"
      h="5rem"
    />
  </Flex>
);

export default LoaderFull;
