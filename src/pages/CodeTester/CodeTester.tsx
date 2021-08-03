import { Button, Flex, Select } from '@chakra-ui/react';
import CodeEditor, { Language } from '@common/CodeEditor/CodeEditor';
import useApi from '@hooks/useApi';
import { PageBase } from 'paging';
import React, { ChangeEventHandler, FC, useEffect, useState } from 'react';
import { ICodeTest, ICodeTestContent } from './CodeTest/CodeTest';
import { API_PATH } from '@constants/configs';
import { ICodeExecutorBody } from 'code_executor';
import {
  getCodeFromStorage,
  saveCodeIntoStorage,
  getLanguageFromStorage,
  saveLanguageIntoStorage,
  getTestsFromStorage,
  saveTestsIntoStorage
} from '@utilities/code-executor';
import TestList from './CodeTest/TestList';
import { SUPPORTED_LANGUAGES } from '@constants/code-executor';
import { isEmpty, generateId } from '@utilities/helper';

interface ICheckResult {
  submissionId: string;
}

interface ISubmissionResponse {
  submissionId: string;
}

interface ICodeOutput {
  result: Record<string, string>;
}

export const createNewTest = (): ICodeTestContent => ({
  id: generateId(8),
  input: '',
  expectedOutput: '',
  output: '',
  isCollapsed: false,
  executionStatus: 'Not Started'
});

const CodeTester: FC<PageBase> = ({ documentTitle }) => {
  const [language, setLanguage] = useState<Language>(getLanguageFromStorage());
  const [codeContent, setCodeContent] = useState<string>('');
  const [tests, setTests] = useState<ICodeTestContent[]>(getTestsFromStorage());

  const { apiPost, getIntervalRequest } = useApi();

  const _collapseAllTests = () => {
    setTests((prevTests) => prevTests.map((test) => ({ ...test, isCollapsed: true })));
  };

  const _setExecuteTests = (testId: string | undefined) => {
    setTests((prevTests) =>
      prevTests.map((test) => {
        return testId
          ? { ...test, executionStatus: test.id === testId ? 'Started' : test.executionStatus }
          : { ...test, executionStatus: 'Started' };
      })
    );
  };

  const _checkResult = async (submissionId: string, singleId: string | undefined = undefined) => {
    const body: ICheckResult = {
      submissionId
    };
    const request = () =>
      apiPost<ICodeOutput>(API_PATH.CODE_EXECUTOR.CHECK_RESULT, body).then((res) => {
        const { result } = res;
        setTests((prevTests) =>
          prevTests.map((test) => {
            return singleId && test.id !== singleId
              ? test
              : {
                  ...test,
                  output: result[test.id],
                  executionStatus: isEmpty(result[test.id]) ? 'Started' : 'Finished'
                };
          })
        );
        return res;
      });

    const checkFn = (res: ICodeOutput) => {
      const numsTests = singleId ? 1 : tests.length;
      const isFulfilled = Object.values(res.result).filter((output) => output).length === numsTests;
      return isFulfilled;
    };

    const interval = getIntervalRequest<ICodeOutput>(request, checkFn, 1000);
    // stop requesting if server take too long to response the fulfilled result
    setTimeout(() => {
      clearInterval(interval);
    }, 10000);
  };

  const _handleRunTests = async (testId: string | undefined = undefined) => {
    _setExecuteTests(testId);
    if (!testId) _collapseAllTests();
    const targetTests: ICodeTestContent[] = testId
      ? ([tests.find((test) => test.id === testId)].filter((t) => t) as ICodeTestContent[])
      : tests;
    const body: ICodeExecutorBody = {
      typedCode: codeContent,
      inputs: targetTests.map((test) => ({ id: test.id, input: test.input })),
      language
    };
    const { submissionId } = await apiPost<ISubmissionResponse>(API_PATH.CODE_EXECUTOR.ROOT, body);
    _checkResult(submissionId, testId);
  };

  const _handleRunAllTests = () => _handleRunTests();

  const _handleChangeLanguage: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const lang = e.target.value as Language;
    setLanguage(lang);
  };

  const _handleAddTest = () => {
    setTests((prevTests) => [...prevTests, createNewTest()]);
  };

  const _handleTestChange: ICodeTest['handleOnChange'] = (testId, newTest) => {
    setTests((prevTests) => prevTests.map((test) => (test.id == testId ? newTest : test)));
  };

  const _handleRemoveTest: ICodeTest['handleOnRemove'] = (testId) => {
    setTests((prevTests) => prevTests.filter((test) => test.id != testId));
  };

  const _handleRunSingleTest: ICodeTest['handleOnRunSingleTest'] = (id: string) => {
    _handleRunTests(id);
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

  useEffect(() => {
    saveTestsIntoStorage(tests);
  }, [tests]);

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
          gridGap="4"
        >
          <TestList
            tests={tests}
            handleTestChange={_handleTestChange}
            handleRemoveTest={_handleRemoveTest}
            handleRunSingleTest={_handleRunSingleTest}
          />
        </Flex>
      </Flex>

      {/* Functional Buttons */}
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
        <Button size="md" onClick={_handleRunAllTests}>
          Run Test
        </Button>
      </Flex>
    </Flex>
  );
};

export default CodeTester;
