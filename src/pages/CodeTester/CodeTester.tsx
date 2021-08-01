import { Button, Flex, Heading, Select, useBoolean } from '@chakra-ui/react';
import CodeEditor, { Language } from '@common/CodeEditor/CodeEditor';
import useApi from '@hooks/useApi';
import { PageBase } from 'paging';
import React, { ChangeEventHandler, FC, useEffect, useState } from 'react';
import CodeTest, { ICodeTest, ICodeTestContent } from './CodeTest/CodeTest';
import { API_PATH } from '../../constants/configs';
import { ICodeExecutorBody } from 'code_executor';
import {
  getCodeFromStorage,
  saveCodeIntoStorage,
  getLanguageFromStorage,
  saveLanguageIntoStorage
} from '@utilities/code-executor';

const SUPPORTED_LANGUAGES: Language[] = ['javascript', 'typescript', 'cpp', 'python', 'java'];

interface ICheckResult {
  submissionId: string;
  numTests: number;
}

interface ISubmissionResponse {
  submissionId: string;
}

interface ICodeOutput {
  result: string[];
}

const DEFAULT_TEST: ICodeTestContent = {
  input: '',
  expectedOutput: '',
  output: ''
};

const CodeTester: FC<PageBase> = ({ documentTitle }) => {
  const [language, setLanguage] = useState<Language>(getLanguageFromStorage());
  const [codeContent, setCodeContent] = useState<string>('');
  const [tests, setTests] = useState<ICodeTestContent[]>([]);
  const [isExecuting, setIsExecuting] = useBoolean(false);

  const { apiPost, getIntervalRequest } = useApi();

  const _checkResult = async (submissionId: string) => {
    setIsExecuting.on();
    setTests((prevTests) => prevTests.map((test) => ({ ...test, output: '' })));

    const body: ICheckResult = {
      submissionId,
      numTests: tests.length
    };
    const request = () =>
      apiPost<ICodeOutput>(API_PATH.CODE_EXECUTOR.CHECK_RESULT, body).then((res) => {
        const { result } = res;
        setTests((prevTests) => prevTests.map((test, idx) => ({ ...test, output: result[idx] })));
        return res;
      });
    const interval = getIntervalRequest<ICodeOutput>(
      request,
      (res) => {
        const isFulfilled = res.result.every((elem) => elem !== null);
        if (isFulfilled) setIsExecuting.off();
        return isFulfilled;
      },
      1000
    );
    // stop requesting if server take too long to response the fulfilled result
    setTimeout(() => clearInterval(interval), 10000);
  };

  const _handleRunTests = async () => {
    const body: ICodeExecutorBody = {
      typedCode: codeContent,
      inputs: tests.map((test) => test.input),
      language
    };
    const { submissionId } = await apiPost<ISubmissionResponse>(API_PATH.CODE_EXECUTOR.ROOT, body);
    _checkResult(submissionId);
  };

  const _handleChangeLanguage: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const lang = e.target.value as Language;
    setLanguage(lang);
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

  useEffect(() => {
    saveLanguageIntoStorage(language);
    setCodeContent(getCodeFromStorage(language));
  }, [language]);

  useEffect(() => {
    if (!codeContent) return;
    saveCodeIntoStorage(codeContent, language);
  }, [codeContent]);

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
                isExecuting={isExecuting}
                test={test}
                handleOnChange={_handleTestChange}
                handleOnRemove={_handleRemoveTest}
              />
            ))}
          </Flex>
        </Flex>
      </Flex>
      <Flex w="50%" justify="space-around" m="0 auto">
        <Select value={language} variant="filled" w="max-content" onChange={_handleChangeLanguage}>
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={`code-lang-${lang}`} value={lang}>
              {lang}
            </option>
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
