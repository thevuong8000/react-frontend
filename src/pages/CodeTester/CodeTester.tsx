import { Button, Flex, Heading, Select } from '@chakra-ui/react';
import CodeEditor, { Language } from '@common/CodeEditor/CodeEditor';
import useApi from '@hooks/useApi';
import { PageBase } from 'paging';
import React, { ChangeEventHandler, FC, useEffect, useState } from 'react';
import CodeTest, { ICodeTest, ICodeTestBase } from './CodeTest/CodeTest';
import { API_PATH } from '../../constants/configs';
import { ICodeExecutorBody } from 'code_executor';

const SUPPORTED_LANGUAGES: Language[] = ['javascript', 'typescript', 'cpp', 'python', 'java'];

const DEFAULT_TEST: ICodeTestBase = {
  input: '',
  expectedOutput: '',
  correctOutput: ''
};

const DEFAULT_CODE: Record<Language, string> = {
  javascript: '// right some code\n',
  typescript: '// right some code\n',
  cpp: '// right some code\n',
  java: '// right some code\n',
  python: '# right some code\n'
};

const CodeTester: FC<PageBase> = ({ documentTitle }) => {
  const [language, setLanguage] = useState<Language>('javascript');
  const [codeContent, setCodeContent] = useState<string>(DEFAULT_CODE[language]);
  const [tests, setTests] = useState<ICodeTestBase[]>([]);

  const { apiPost } = useApi();

  const _handleChangeLanguage: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const lang = e.target.value as Language;
    setLanguage(lang);
    setCodeContent(DEFAULT_CODE[lang]);
  };

  const _handleRunTests = () => {
    const body: ICodeExecutorBody = {
      typedCode: codeContent,
      input: '',
      language
    };
    apiPost(API_PATH.CODE_EXECUTOR.ROOT, body);
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
        <CodeEditor
          height="80vh"
          width="50vw"
          content={codeContent}
          setContent={setCodeContent}
          lang={language}
        />
        <Flex
          grow={1}
          direction="column"
          p="3"
          pt="0"
          maxHeight="80vh"
          overflowY="auto"
          pos="relative"
        >
          {tests.length <= 0 && (
            <Heading m="0 auto" mb="4">
              You have no test
            </Heading>
          )}
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
        <Select variant="filled" w="max-content" onChange={_handleChangeLanguage}>
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option value={lang}>{lang}</option>
          ))}
        </Select>
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
