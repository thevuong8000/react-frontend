import { Flex, useBoolean, useToast } from '@chakra-ui/react';
import CodeEditor, { ICodeEditor, Language } from '@common/CodeEditor/CodeEditor';
import useApi from '@hooks/useApi';
import { PageBase } from 'paging';
import React, { ChangeEventHandler, FC, useCallback, useEffect, useRef, useState } from 'react';
import { API_PATH } from '@constants/configs';
import {
  getCodeFromStorage,
  saveCodeIntoStorage,
  getLanguageFromStorage,
  saveLanguageIntoStorage,
  getTestsFromStorage,
  saveTestsIntoStorage
} from '@utilities/code-executor';
import { isEmpty, generateId } from '@utilities/helper';
import { editor } from 'monaco-editor';
import { Monaco } from '@monaco-editor/react';
import useServerStatus from '@hooks/useServerStatus';
import useNotify from '@hooks/useNotify';
import { ICodeExecutorBody } from 'code_executor';
import Executor, { IExecutionMode } from './Executor';
import { useHeader } from '../../contexts/header-provider';
import CandraFunctions from './CandraFunctions';
import { ITest, ITestCase } from './ListTests/Test';

interface ICheckResult {
  submissionId: string;
}

interface ISubmissionResponse {
  submissionId: string;
}

interface IOutputSuccess {
  readonly status: 'Success';
  readonly output?: string;
}

interface IOutputFailure {
  readonly status: 'Error' | 'Pending';
  readonly type?: 'Runtime Error';
  readonly errorDetail?: string;
}

type IOutput = IOutputSuccess | IOutputFailure;

// eslint-disable-next-line no-unused-vars
interface IRegularResult {
  readonly regular_output: IOutput;
}

type ICompetitiveResult = Record<string, IOutput>;

interface ICodeOutput {
  status: 'Success' | 'Error';
  isFinished: boolean;
  [key: string]: any;
}

const COMPILE_ERROR_TOAST_ID = 'compile-error-toast-id';

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
  const [isExecuting, setIsExecuting] = useBoolean(false);

  const [executionMode, setExecutionMode] = useState<IExecutionMode>('Competitive Programming');

  const editorRef = useRef<editor.IStandaloneCodeEditor>();
  const monacoRef = useRef<Monaco>();

  const { apiPost, requestExhausively } = useApi();
  const { setHeaderFunctions } = useHeader();
  const { checkIfServerIsRestarting } = useServerStatus();
  const { setNotifier } = useNotify();
  const toast = useToast();

  const _collapseAllTests = useCallback(() => {
    setTests((prevTests) => prevTests.map((test) => ({ ...test, isCollapsed: true })));
  }, []);

  const _expandAllTests = useCallback(() => {
    setTests((prevTests) => prevTests.map((test) => ({ ...test, isCollapsed: false })));
  }, []);

  const _setExecuteTests = useCallback((testId: string | undefined) => {
    setTests((prevTests) =>
      prevTests.map((test) =>
        testId
          ? { ...test, executionStatus: test.id === testId ? 'Started' : test.executionStatus }
          : { ...test, executionStatus: 'Started' }
      )
    );
  }, []);

  const _handleCompileError = useCallback((name: string, detail: string) => {
    setNotifier({
      id: COMPILE_ERROR_TOAST_ID,
      title: name,
      description: detail,
      status: 'error',
      duration: null
    });

    setTests((prevTests) => prevTests.map((test) => ({ ...test, executionStatus: 'Not Started' })));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _handleUpdateTestsStatus = (result: ICompetitiveResult) => {
    setTests((prevTests) =>
      prevTests.map((test) => {
        const { status = 'Pending' } = result[test.id] ?? {};
        if (status === 'Error') return { ...test, executionStatus: 'Runtime Error' };
        if (status === 'Success') {
          const { output } = result[test.id] as IOutputSuccess;
          return {
            ...test,
            output: output ?? '',
            executionStatus: isEmpty(output) ? 'Started' : 'Finished'
          };
        }
        return test;
      })
    );
  };

  const _checkResult = useCallback(
    async (submissionId: string) => {
      const body: ICheckResult = {
        submissionId
      };

      const requestFn = () => apiPost<ICodeOutput>(API_PATH.CODE_EXECUTOR.CHECK_RESULT, body);
      const processData = (res: ICodeOutput) => {
        const { status } = res;

        if (status === 'Error') return _handleCompileError(res.type, res.detail);
        return _handleUpdateTestsStatus(res.result);
      };

      // The execution is finished if Compile Error or All tests are done
      const checkIfFinishedFn = (res: ICodeOutput) => {
        const { isFinished } = res;
        if (isFinished) setIsExecuting.off();
        return isFinished;
      };

      requestExhausively(requestFn, processData, checkIfFinishedFn);
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tests]
  );

  const _handleExecuteTestsCompetitiveMode = useCallback(
    async (testId: string | undefined = undefined) => {
      _setExecuteTests(testId);
      if (!testId) _collapseAllTests();
      const targetTests: ITestCase[] = testId
        ? ([tests.find((test) => test.id === testId)].filter((t) => t) as ITestCase[])
        : tests;

      const body: ICodeExecutorBody<'Competitive Programming'> = {
        mode: 'Competitive Programming',
        typedCode: editorRef.current?.getValue() || '',
        inputs: targetTests.map((test) => ({ id: test.id, input: test.input })),
        language
      };

      const { submissionId } = await apiPost<ISubmissionResponse>(
        API_PATH.CODE_EXECUTOR.ROOT,
        body
      );
      _checkResult(submissionId);
    },
    [_checkResult, _setExecuteTests, _collapseAllTests, apiPost, language, tests]
  );

  const _handleExecuteAllTestsCompetitiveMode = useCallback(
    () => _handleExecuteTestsCompetitiveMode(),
    [_handleExecuteTestsCompetitiveMode]
  );

  const _handleExecuteRegularMode = useCallback(() => {
    alert('This funciton has not been available yet!');
  }, []);

  const _handleExecuteCode = useCallback(() => {
    toast.close(COMPILE_ERROR_TOAST_ID);
    setIsExecuting.on();

    switch (executionMode) {
      case 'Competitive Programming':
        return _handleExecuteAllTestsCompetitiveMode();

      case 'Regular':
        return _handleExecuteRegularMode();

      default:
        return undefined;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [executionMode, _handleExecuteAllTestsCompetitiveMode, _handleExecuteRegularMode]);

  const _handleChangeLanguage: ChangeEventHandler<HTMLSelectElement> = useCallback((e) => {
    const lang = e.target.value as Language;
    setLanguage(lang);
  }, []);

  const _handleAddTest = useCallback(() => {
    setTests((prevTests) => [...prevTests, createNewTest()]);
  }, []);

  const _handleTestChange: ITest['handleOnChange'] = useCallback((testId, newTest) => {
    setTests((prevTests) => prevTests.map((test) => (test.id === testId ? newTest : test)));
  }, []);

  const _handleRemoveTest: ITest['handleOnRemove'] = useCallback((testId) => {
    setTests((prevTests) => prevTests.filter((test) => test.id !== testId));
  }, []);

  const _handleRunSingleTest: ITest['handleOnRunSingleTest'] = useCallback(
    (id: string) => {
      _handleExecuteTestsCompetitiveMode(id);
    },
    [_handleExecuteTestsCompetitiveMode]
  );

  const _setEditorSubmitAction = useCallback(
    (ed: editor.IStandaloneCodeEditor, monaco: Monaco) => {
      ed.addAction({
        id: 'execute-shortcut',
        label: 'execution shortcut',

        // eslint-disable-next-line no-bitwise
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
        run: _handleExecuteCode
      });
    },
    [_handleExecuteCode]
  );

  const _handleEditorDidMount: ICodeEditor['handleEditorDidMount'] = useCallback(
    (codeEditor, monaco) => {
      editorRef.current = codeEditor;
      monacoRef.current = monaco;

      codeEditor.setValue(getCodeFromStorage(language));

      _setEditorSubmitAction(codeEditor, monaco);
    },
    []
  );

  useEffect(() => {
    document.title = documentTitle;

    // At first, check if the server is up
    // if not, wake the server up by call an API
    checkIfServerIsRestarting();

    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  useEffect(() => {
    // Change header functions
    setHeaderFunctions(() => (
      <CandraFunctions
        initLanguage={language}
        isExecuting={isExecuting}
        handleCollapseAll={_collapseAllTests}
        handleExpendAll={_expandAllTests}
        handleChangeLanguage={_handleChangeLanguage}
        handleAddTest={_handleAddTest}
        handleExecuteCode={_handleExecuteCode}
      />
    ));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    _collapseAllTests,
    _expandAllTests,
    _handleAddTest,
    _handleChangeLanguage,
    _handleExecuteCode,
    isExecuting
  ]);

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
