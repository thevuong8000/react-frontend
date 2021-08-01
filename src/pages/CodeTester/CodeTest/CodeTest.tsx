import { Button, Flex, Text, Textarea, Tooltip } from '@chakra-ui/react';
import React, { ChangeEventHandler, FC, useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { TiTick } from 'react-icons/ti';
import { VscRunAll } from 'react-icons/vsc';
import { IoMdClose } from 'react-icons/io';

export interface ICodeTestBase {
  input: string;
  expectedOutput: string;
  output: string;
}

export interface ICodeTest extends ICodeTestBase {
  index: number;
  handleOnChange: (index: number, newTest: ICodeTestBase) => void;
  handleOnRemove: (index: number) => void;
}

type ITestResult = 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Memory Limit Exceeded';

const IconCodeResult: FC<{ result: ITestResult }> = ({ result }) => {
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

const CodeTest: FC<ICodeTest> = ({
  input,
  expectedOutput,
  output,
  handleOnChange,
  handleOnRemove,
  index
}) => {
  const [test, setTest] = useState<ICodeTestBase>({ input, expectedOutput, output });
  const [testResult, setTestResult] = useState<Nullable<ITestResult>>(null);

  const _handleOnChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const { name, value } = e.target;
    setTest((prevTest) => ({ ...prevTest, [name]: value }));
  };

  useEffect(() => {
    handleOnChange(index, test);
  }, [test]);

  return (
    <Flex direction="column">
      {/* Test Toolbar */}
      <Flex direction="row">
        <Text mb="1" mr="1">
          Test #{index + 1}
        </Text>

        <Tooltip label="Run this test">
          <Button variant="ghost" colorScheme="green">
            <VscRunAll size="22" />
          </Button>
        </Tooltip>

        <Tooltip label="Remove this test">
          <Button variant="ghost" colorScheme="red" onClick={() => handleOnRemove(index)}>
            <MdDelete size="22" />
          </Button>
        </Tooltip>
      </Flex>

      {/* Test Result */}
      <Flex>
        <IconCodeResult result="Accepted" />
      </Flex>
      {testResult && (
        <Flex>
          <IconCodeResult result={testResult} />
        </Flex>
      )}

      {/* Test Content */}
      <Flex direction="row" w="100%" gridGap="3" h="48">
        <Textarea
          name="input"
          w="60%"
          h="100%"
          resize="none"
          placeholder="Input..."
          value={test.input}
          onChange={_handleOnChange}
          size="lg"
        />
        <Flex grow={1} direction="column" h="100%" gridGap="3">
          <Textarea
            name="expectedOutput"
            h="100%"
            w="100%"
            resize="none"
            placeholder="Expected Output..."
            value={test.expectedOutput}
            onChange={_handleOnChange}
            size="md"
          />
          <Textarea
            h="100%"
            w="100%"
            resize="none"
            placeholder="Corrected Output..."
            defaultValue={output}
            readOnly
            size="md"
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CodeTest;
