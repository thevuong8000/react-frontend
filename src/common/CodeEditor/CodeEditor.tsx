import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import Editor, { OnMount, useMonaco } from '@monaco-editor/react';
import { useColorMode } from '@chakra-ui/react';

export type Language = 'javascript' | 'typescript' | 'cpp' | 'python' | 'java';

export interface ICodeEditor {
  height?: string;
  width?: string;
  lang?: Language;
  handleEditorDidMount: OnMount;
}

const CodeEditor = forwardRef<any, ICodeEditor>(
  ({ height = '60vh', width = '40vw', lang = 'javascript', handleEditorDidMount }, ref) => {
    const { colorMode } = useColorMode();

    return (
      <Editor
        height={height}
        width={width}
        theme={colorMode === 'dark' ? 'vs-dark' : 'light'}
        language={lang}
        onMount={handleEditorDidMount}
        className={colorMode === 'dark' ? 'code_editor_dark' : 'code_editor_light'}
      />
    );
  }
);

export default CodeEditor;
