import { Button, Spinner, Text } from '@chakra-ui/react';
import React, { FC } from 'react';
import { IoMdClose } from 'react-icons/io';
import { TiTick } from 'react-icons/ti';
import { ExecutionStatus } from './Test';

export type ITestResultStatus =
  | 'Accepted'
  | 'Wrong Answer'
  | 'Time Limit Exceeded'
  | 'Memory Limit Exceeded'
  | 'Runtime Error';

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
          <Text>{result}</Text>
          <TiTick size={25} />
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
          <Text>{result}</Text>
          <IoMdClose size={25} />
        </Button>
      );
  }
};

export const TestResult: FC<{ result: ExecutionStatus }> = ({ result }) => {
  switch (result) {
    case 'Not Started':
      return null;

    case 'Started':
    case 'Finished':
      return <Spinner size="sm" speed="0.8s" color="blue.500" />;

    default:
      return <IconTestResult result={result} />;
  }
};

export default TestResult;
