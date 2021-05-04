import React from 'react';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input';
import { Text } from '@chakra-ui/layout';
import { ClassNames } from '@emotion/react';

const InputText = ({ className, error, icon, ...props }) => (
  <>
    <InputGroup maxW="unset" className={ClassNames(className)}>
      <InputLeftElement>{icon}</InputLeftElement>
      <Input autoComplete="off" spellCheck="false" {...props} />
    </InputGroup>
    {error && <Text>{error}</Text>}
  </>
);

export default InputText;
