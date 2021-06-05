import React, { FC, ReactNode } from 'react';
import Icon from '@chakra-ui/icon';
import { Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/input';
import { Text } from '@chakra-ui/layout';
import { Tooltip } from '@chakra-ui/tooltip';

interface IInputText {
  error?: Nullable<string>;
  icon?: ReactNode;
  moreInfo: Nullable<{
    message: string;
    icon: ReactNode;
  }>;
}

const InputText: FC<IInputText> = ({ error, icon, moreInfo, ...props }) => (
  <>
    <InputGroup maxW="unset">
      {icon && <InputLeftElement h="100%">{icon}</InputLeftElement>}
      <Input autoComplete="off" spellCheck="false" type="text" borderRadius="md" {...props} />
      {moreInfo && (
        <InputRightElement h="100%">
          <Tooltip label={moreInfo.message} hasArrow placement="auto">
            {moreInfo.icon ?? <Icon />}
          </Tooltip>
        </InputRightElement>
      )}
    </InputGroup>
    {error && <Text>{error}</Text>}
  </>
);

export default InputText;
