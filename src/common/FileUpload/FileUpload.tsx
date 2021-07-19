import { Box, Input } from '@chakra-ui/react';
import React, { ChangeEventHandler, FC, useRef } from 'react';

interface IFileUpload {
  onFileUpload: ChangeEventHandler;
}

const FileUpload: FC<IFileUpload> = ({ onFileUpload, children }) => {
  const ref = useRef<HTMLInputElement>(null);

  const _evokeInputFile = () => {
    ref.current?.click();
  };

  return (
    <Box onClick={_evokeInputFile} w="max-content">
      {children}
      <Input ref={ref} type="file" onChange={onFileUpload} display="none" visibility="hidden" />
    </Box>
  );
};

export default FileUpload;
