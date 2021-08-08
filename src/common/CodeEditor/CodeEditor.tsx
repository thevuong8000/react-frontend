import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import Editor, { OnChange, OnMount, useMonaco } from '@monaco-editor/react';
import { useColorMode } from '@chakra-ui/react';

export type Language = 'javascript' | 'typescript' | 'cpp' | 'python' | 'java';

export interface ICodeEditor {
  height?: string;
  width?: string;
  lang?: Language;
  content?: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  editorActions: editor.IActionDescriptor[];
}

const CodeEditor = forwardRef<any, ICodeEditor>(
  (
    {
      height = '60vh',
      width = '40vw',
      lang = 'javascript',
      content = '',
      setContent,
      editorActions = []
    },
    ref
  ) => {
    const { colorMode } = useColorMode();
    const editorRef = useRef<editor.IStandaloneCodeEditor>();
    const monaco = useMonaco();

    useImperativeHandle(ref, () => ({
      getValue: () => editorRef.current?.getValue(),
      setValue: (newValue: string) => editorRef.current?.setValue(newValue),
      addAction: (action: editor.IActionDescriptor) => editorRef.current?.addAction(action)
    }));

    const handleEditorDidMount: OnMount = (editor, monaco) => {
      editorRef.current = editor;
    };

    const _onChange: OnChange = (value, ev) => {
      setContent(value ?? '');
    };

    useEffect(() => {
      if (editorRef.current && monaco) {
        console.log(editorActions);
        editorActions.forEach((action) => {
          editorRef.current?.addAction({
            ...action,
            keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter]
          });
        });
      }
    }, [editorActions, monaco]);

    return (
      <Editor
        height={height}
        width={width}
        theme={colorMode === 'dark' ? 'vs-dark' : 'light'}
        language={lang}
        value={content}
        onChange={_onChange}
        onMount={handleEditorDidMount}
        className={colorMode === 'dark' ? 'code_editor_dark' : 'code_editor_light'}
      />
    );
  }
);

export default CodeEditor;
