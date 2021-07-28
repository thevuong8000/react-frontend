import React, { FC, useRef } from 'react';
import { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import Editor, { OnChange, OnMount } from '@monaco-editor/react';

type language = 'javascript' | 'cpp' | 'python' | 'java';
interface ICodeEditor {
  height?: string;
  width?: string;
  lang?: language;
  content?: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

const CodeEditor: FC<ICodeEditor> = ({
  height = '60vh',
  width = '40vw',
  lang = 'javascript',
  content = '',
  setContent
}) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor>();

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const _onChange: OnChange = (value, ev) => {
    setContent(value ?? '');
  };

  return (
    <Editor
      height={height}
      width={width}
      theme="vs-dark"
      language={lang}
      value={content}
      onChange={_onChange}
      onMount={handleEditorDidMount}
    />
  );
};

export default CodeEditor;
