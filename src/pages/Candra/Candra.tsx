import { Button, Flex, Select } from '@chakra-ui/react';
import CodeEditor, { ICodeEditor, Language } from '@common/CodeEditor/CodeEditor';
import useApi from '@hooks/useApi';
import { PageBase } from 'paging';
import React, { ChangeEventHandler, FC, useCallback, useEffect, useRef, useState } from 'react';
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
import { SUPPORTED_LANGUAGES } from '@constants/code-executor';
import { isEmpty, generateId } from '@utilities/helper';
import { editor } from 'monaco-editor';
import { Monaco } from '@monaco-editor/react';
import Executor from './Executor';
import { IExecutionMode } from './Executor';
import { useHeader } from '../../contexts/header-provider';

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

interface ICandraHeaderFunctions {
  initLanguage: Language;
  handleChangeLanguage: ChangeEventHandler<HTMLSelectElement>;
  handleAddTest: () => void;
  handleExecuteCode: () => void | Promise<void>;
}

const CandraHeaderFunctions: FC<ICandraHeaderFunctions> = ({
  initLanguage,
  handleChangeLanguage,
  handleAddTest,
  handleExecuteCode
}) => {
  return (
    <Flex w="50%" justify="space-around" m="0 auto">
      <Select
        defaultValue={initLanguage}
        variant="filled"
        w="max-content"
        onChange={handleChangeLanguage}
      >
        {SUPPORTED_LANGUAGES.map((lang) => (
          <option key={`code-lang-${lang}`} value={lang}>
            {lang}
          </option>
        ))}
      </Select>
      <Button size="md" onClick={handleAddTest}>
        Add Test
      </Button>
      <Button size="md" onClick={handleExecuteCode}>
        Run Test
      </Button>
    </Flex>
  );
};

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
  const [tests, setTests] = useState<ITestCase[]>(getTestsFromStorage());

  const [executionMode, setExecutionMode] = useState<IExecutionMode>('Competitive Programming');

  const editorRef = useRef<editor.IStandaloneCodeEditor>();
  const monacoRef = useRef<Monaco>();

  const { apiPost, requestExhausively } = useApi();
  const { setHeaderFunctions } = useHeader();

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
    async (submissionId: string, numsTest: number, singleId: string | undefined = undefined) => {
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
        const isFinished = Object.values(res.result).filter((output) => output).length === numsTest;
        return isFinished;
      };

      requestExhausively(requestFn, processData, checkIfFinishedFn);
    },
    [tests]
  );

  const _handleExecuteTestsCompetitiveMode = useCallback(
    async (testId: string | undefined = undefined) => {
      _setExecuteTests(testId);
      if (!testId) _collapseAllTests();
      const targetTests: ITestCase[] = testId
        ? ([tests.find((test) => test.id === testId)].filter((t) => t) as ITestCase[])
        : tests;
      const body: ICodeExecutorBody = {
        typedCode: editorRef.current?.getValue() || '',
        inputs: targetTests.map((test) => ({ id: test.id, input: test.input })),
        language
      };
      const { submissionId } = await apiPost<ISubmissionResponse>(
        API_PATH.CODE_EXECUTOR.ROOT,
        body
      );
      _checkResult(submissionId, targetTests.length, testId);
    },
    [_checkResult, language, tests]
  );

  const _handleExecuteAllTestsCompetitiveMode = useCallback(
    () => _handleExecuteTestsCompetitiveMode(),
    [_handleExecuteTestsCompetitiveMode]
  );

  const _handleExecuteRegularMode = useCallback(() => {
    alert('run in regular mode');
  }, []);

  const _handleExecuteCode = useCallback(() => {
    switch (executionMode) {
      case 'Competitive Programming':
        return _handleExecuteAllTestsCompetitiveMode();

      case 'Regular':
        return _handleExecuteRegularMode();

      default:
        return;
    }
  }, [executionMode, _handleExecuteAllTestsCompetitiveMode, _handleExecuteRegularMode]);

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
    _handleExecuteTestsCompetitiveMode(id);
  }, []);

  const _setEditorSubmitAction = useCallback(
    (ed: editor.IStandaloneCodeEditor, monaco: Monaco) => {
      ed.addAction({
        id: 'execute-shortcut',
        label: 'execution shortcut',
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
        run: _handleExecuteCode
      });
    },
    [_handleExecuteCode]
  );

  const _handleEditorDidMount: ICodeEditor['handleEditorDidMount'] = useCallback(
    (editor, monaco) => {
      editorRef.current = editor;
      monacoRef.current = monaco;

      editor.setValue(getCodeFromStorage(language));

      _setEditorSubmitAction(editor, monaco);
    },
    []
  );

  useEffect(() => {
    document.title = documentTitle;

    // Change header functions
    setHeaderFunctions(() => (
      <CandraHeaderFunctions
        initLanguage={language}
        handleChangeLanguage={_handleChangeLanguage}
        handleAddTest={_handleAddTest}
        handleExecuteCode={_handleExecuteCode}
      />
    ));
  }, []);

  useEffect(() => {
    saveLanguageIntoStorage(language);

    if (editorRef.current) editorRef.current.setValue(getCodeFromStorage(language));

    // Store code, language into local storage
    const interval = setInterval(() => {
      if (editorRef.current) saveCodeIntoStorage(editorRef.current?.getValue(), language);
    }, 200);

    return () => clearInterval(interval);
  }, [language]);

  useEffect(() => {
    saveTestsIntoStorage(tests);
  }, [tests]);

  useEffect(() => {
    if (editorRef.current && monacoRef.current)
      _setEditorSubmitAction(editorRef.current, monacoRef.current);
  }, [_handleExecuteCode]);

  return (
    <Flex direction="column" p="6">
      <Flex direction="row">
        <CodeEditor
          ref={editorRef}
          height="80vh"
          width="50vw"
          lang={language}
          handleEditorDidMount={_handleEditorDidMount}
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
          <Executor
            tests={tests}
            executionMode={executionMode}
            setExecutionMode={setExecutionMode}
            handleTestChange={_handleTestChange}
            handleRemoveTest={_handleRemoveTest}
            handleRunSingleTest={_handleRunSingleTest}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Candra;
