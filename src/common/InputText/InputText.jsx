import React from 'react';
import Icon from '@chakra-ui/icon';
import { Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/input';
import { Text } from '@chakra-ui/layout';
import { Tooltip } from '@chakra-ui/tooltip';
import { element, shape, string } from 'prop-types';

const InputText = ({ error, icon, moreInfo, ...props }) => (
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

InputText.propTypes = {
  className: string,
  error: string,
  icon: element,
  moreInfo: shape({
    message: string,
    icon: element
  })
};

export default InputText;
