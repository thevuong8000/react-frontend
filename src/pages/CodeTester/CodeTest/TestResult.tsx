import { Button, Flex, Text } from '@chakra-ui/react';
import React, { FC } from 'react';
import { IoMdClose } from 'react-icons/io';
import { TiTick } from 'react-icons/ti';

export type ITestResultStatus =
  | 'Accepted'
  | 'Wrong Answer'
  | 'Time Limit Exceeded'
  | 'Memory Limit Exceeded';

const IconTestResult: FC<{ result: ITestResultStatus }> = ({ result }) => {
  switch (result) {
    case 'Accepted':
      return (
        <Button
          variant="ghost"
          colorScheme="green"
          _hover={{ bg: 'none' }}
          _active={{ bg: 'none' }}
          pl={0}
        >
          <TiTick size={25} />
          <Text>{result}</Text>
        </Button>
      );

    default:
      return (
        <Button
          variant="ghost"
          colorScheme="red"
          _hover={{ bg: 'none' }}
          _active={{ bg: 'none' }}
          pl={0}
        >
          <IoMdClose size={25} />
          <Text>{result}</Text>
        </Button>
      );
  }
};

export const TestResult: FC<{ result: ITestResultStatus }> = ({ result }) => {
  return (
    <Flex>
      <IconTestResult result={result} />
    </Flex>
  );
};

export default TestResult;
