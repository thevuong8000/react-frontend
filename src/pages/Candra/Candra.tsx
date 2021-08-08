import { Button, Flex, Select } from '@chakra-ui/react';
import CodeEditor, { ICodeEditor, Language } from '@common/CodeEditor/CodeEditor';
import useApi from '@hooks/useApi';
import { PageBase } from 'paging';
import React, { ChangeEventHandler, FC, useCallback, useEffect, useState } from 'react';
import { ITest, ITestCase } from './ListTests/Test';
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
import ListTests from './ListTests/ListTests';
import { SUPPORTED_LANGUAGES } from '@constants/code-executor';
import { isEmpty, generateId } from '@utilities/helper';

interface ICheckResult {
  submissionId: string;
}

interface ISubmissionResponse {
  submissionId: string;
}

interface ICodeOutput {
  result: {
    error: string;
    [x: string]: string;
  };
}

export const createNewTest = (): ITestCase => ({
  id: generateId(8),
  input: '',
  expectedOutput: '',
  output: '',
  isCollapsed: false,
  executionStatus: 'Not Started'
});

const Candra: FC<PageBase> = ({ documentTitle }) => {
  const [language, setLanguage] = useState<Language>(getLanguageFromStorage());
  const [codeContent, setCodeContent] = useState<string>('');
  const [tests, setTests] = useState<ITestCase[]>(getTestsFromStorage());
  const [editorShortcuts, setEditorShortcuts] = useState<ICodeEditor['editorActions']>([]);

  const { apiPost, requestExhausively } = useApi();

  const _collapseAllTests = useCallback(() => {
    setTests((prevTests) => prevTests.map((test) => ({ ...test, isCollapsed: true })));
  }, []);

  const _setExecuteTests = useCallback((testId: string | undefined) => {
    setTests((prevTests) =>
      prevTests.map((test) => {
        return testId
          ? { ...test, executionStatus: test.id === testId ? 'Started' : test.executionStatus }
          : { ...test, executionStatus: 'Started' };
      })
    );
  }, []);

  const _checkResult = useCallback(
    async (submissionId: string, singleId: string | undefined = undefined) => {
      const body: ICheckResult = {
        submissionId
      };

      const requestFn = () => apiPost<ICodeOutput>(API_PATH.CODE_EXECUTOR.CHECK_RESULT, body);
      const processData = (res: ICodeOutput) => {
        const { result } = res;

        // TODO: handle compile error
        if (result.error) {
          console.log('Compile Error:', result.error);
        }

        setTests((prevTests) =>
          prevTests.map((test) => {
            if (singleId && test.id !== singleId) return test;
            if (result.error) return { ...test, executionStatus: 'Not Started' };
            return {
              ...test,
              output: result[test.id],
              executionStatus: isEmpty(result[test.id]) ? 'Started' : 'Finished'
            };
          })
        );
      };
      const checkIfFinishedFn = (res: ICodeOutput) => {
        if (res.result.error) return true;
        const numsTests = singleId ? 1 : tests.length;
        const isFinished =
          Object.values(res.result).filter((output) => output).length === numsTests;
        return isFinished;
      };

      requestExhausively(requestFn, processData, checkIfFinishedFn);
    },
    []
  );

  const _handleRunTests = useCallback(
    async (testId: string | undefined = undefined) => {
      _setExecuteTests(testId);
      if (!testId) _collapseAllTests();
      const targetTests: ITestCase[] = testId
        ? ([tests.find((test) => test.id === testId)].filter((t) => t) as ITestCase[])
        : tests;
      const body: ICodeExecutorBody = {
        typedCode: codeContent,
        inputs: targetTests.map((test) => ({ id: test.id, input: test.input })),
        language
      };
      const { submissionId } = await apiPost<ISubmissionResponse>(
        API_PATH.CODE_EXECUTOR.ROOT,
        body
      );
      _checkResult(submissionId, testId);
    },
    [_checkResult, codeContent, language, tests]
  );

  const _handleRunAllTests = useCallback(() => _handleRunTests(), [_handleRunTests]);

  const _handleChangeLanguage: ChangeEventHandler<HTMLSelectElement> = useCallback((e) => {
    const lang = e.target.value as Language;
    setLanguage(lang);
  }, []);

  const _handleAddTest = useCallback(() => {
    setTests((prevTests) => [...prevTests, createNewTest()]);
  }, []);

  const _handleTestChange: ITest['handleOnChange'] = useCallback((testId, newTest) => {
    setTests((prevTests) => prevTests.map((test) => (test.id == testId ? newTest : test)));
  }, []);

  const _handleRemoveTest: ITest['handleOnRemove'] = useCallback((testId) => {
    setTests((prevTests) => prevTests.filter((test) => test.id != testId));
  }, []);

  const _handleRunSingleTest: ITest['handleOnRunSingleTest'] = useCallback((id: string) => {
    _handleRunTests(id);
  }, []);

  useEffect(() => {
    document.title = documentTitle;
    setEditorShortcuts([
      {
        id: 'execute-shortcut',
        label: 'execution shortcut',
        keybindings: [5 | 21],
        run: _handleRunAllTests
      }
    ]);
  }, [_handleRunAllTests]);

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
          editorActions={editorShortcuts}
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
          <ListTests
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

export default Candra;
