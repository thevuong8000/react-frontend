import React, { FC } from 'react';
import { chakra, useColorModeValue } from '@chakra-ui/system';
import { Text } from '@chakra-ui/layout';
import { IoWarningSharp } from 'react-icons/io5';

interface Message {
  message: string;
}

const ErrorMessage: FC<Message> = ({ message, ...props }) => {
  const color = useColorModeValue('red.500', 'red.300');
  return (
    <Text colorScheme="red" color={color} d="inline-flex" alignItems="center" {...props}>
      <IoWarningSharp display="inline" />
      <chakra.span pl={1}>{message}</chakra.span>
    </Text>
  );
};
export default ErrorMessage;
