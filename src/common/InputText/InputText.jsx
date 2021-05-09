import React from 'react';
import Icon from '@chakra-ui/icon';
import { Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/input';
import { Text } from '@chakra-ui/layout';
import { Tooltip } from '@chakra-ui/tooltip';
import { ClassNames } from '@emotion/react';
import { element, shape, string } from 'prop-types';

const InputText = ({ className, error, icon, helperFunc: moreInfo, ...props }) => (
  <>
    <InputGroup maxW="unset" className={ClassNames(className)}>
      <InputLeftElement>{icon}</InputLeftElement>
      <Input autoComplete="off" spellCheck="false" {...props} />
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
