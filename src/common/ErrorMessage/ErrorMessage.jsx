import React from 'react';
import { chakra, useColorModeValue } from '@chakra-ui/system';
import { Text } from '@chakra-ui/layout';
import { IoWarningSharp } from 'react-icons/io5';

const ErrorMessage = ({ message, ...props }) => {
  const color = useColorModeValue('red.500', 'red.300');
  return (
    <Text colorScheme="red" color={color} d="inline-flex" alignItems="center" {...props}>
      <IoWarningSharp display="inline" />
      <chakra.span pl={1}>{message}</chakra.span>
    </Text>
  );
};
export default ErrorMessage;
