import { Button, Flex, Image } from '@chakra-ui/react';
import FileUpload from '@common/FileUpload/FileUpload';
import React, { ChangeEventHandler, useState } from 'react';

const FileUploadDemo = () => {
  const [img, setImg] = useState<string>();

  const _handleFileUpload: ChangeEventHandler = (e) => {
    console.log((e.currentTarget as HTMLInputElement).files);
    setImg(window.URL.createObjectURL((e.currentTarget as HTMLInputElement).files?.[0]));
  };

  return (
    <Flex direction="row" justifyContent="space-between">
      <FileUpload onFileUpload={_handleFileUpload}>
        <Button size="md">Upload File</Button>
      </FileUpload>
      {img && <Image src={img} boxSize="100px" />}
    </Flex>
  );
};

export default FileUploadDemo;
