import { Button, Flex, Heading } from '@chakra-ui/react';
import CodeEditor from '@common/CodeEditor/CodeEditor';
import { PageBase } from 'paging';
import React, { FC, useEffect, useState } from 'react';
import CodeTest, { ICodeTest, ICodeTestBase } from './CodeTest/CodeTest';

const DEFAULT_TEST: ICodeTestBase = {
  input: '',
  expectedOutput: '',
  correctOutput: ''
};

const CodeTester: FC<PageBase> = ({ documentTitle }) => {
  const [codeContent, setCodeContent] = useState<string>('// right some code\n');
  const [tests, setTests] = useState<ICodeTestBase[]>([]);

  const _handleRunTests = () => {
    console.log('typed_code: ', codeContent);
    tests.forEach((test, idx) => {
      console.log('input', idx);
      console.log(test.input);
      console.log(test.expectedOutput);
    });
  };

  const _handleTestChange: ICodeTest['handleOnChange'] = (index, newTest) => {
    setTests((prevTests) => prevTests.map((test, idx) => (idx == index ? newTest : test)));
  };

  const _handleAddTest = () => {
    setTests((prevTests) => [...prevTests, { ...DEFAULT_TEST }]);
  };

  const _handleRemoveTest: ICodeTest['handleOnRemove'] = (index) => {
    setTests((prevTests) => prevTests.filter((_, idx) => idx != index));
  };

  useEffect(() => {
    document.title = documentTitle;
  });

  return (
    <Flex direction="column" p="6">
      <Flex direction="row">
        <CodeEditor height="80vh" width="50vw" content={codeContent} setContent={setCodeContent} />
        <Flex
          grow={1}
          direction="column"
          p="3"
          pt="0"
          maxHeight="80vh"
          overflowY="auto"
          pos="relative"
        >
          <Heading m="0 auto" mb="4">
            Test
          </Heading>
          <Flex w="100%" direction="column" gridGap="4">
            {tests.map((test, idx) => (
              <CodeTest
                key={`test-${idx}`}
                index={idx}
                input={test.input}
                expectedOutput={test.expectedOutput}
                correctOutput={test.correctOutput}
                handleOnChange={_handleTestChange}
                handleOnRemove={_handleRemoveTest}
              />
            ))}
          </Flex>
        </Flex>
      </Flex>
      <Flex w="50%" justify="space-around" m="0 auto">
        <Button size="md" onClick={_handleAddTest}>
          Add Test
        </Button>
        <Button size="md" onClick={_handleRunTests}>
          Run Test
        </Button>
      </Flex>
    </Flex>
  );
};

export default CodeTester;
