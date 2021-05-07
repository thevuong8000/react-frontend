import { Box, VStack, Button as ChakraButton } from '@chakra-ui/layout';
import { useTheme } from '@chakra-ui/system';
import useToggle from '@hooks/useToggle';
import React, { forwardRef } from 'react';

const DropdownTable = (props, ref) => {
  const {
    name,
    options = [], // { value: any, text: string, isDisable: boolean, Icon: React.Component }
    value,
    isOpen,
    onSelect,
    isMultiple
  } = props;

  const { zIndices } = useTheme();
  const opacity = useToggle(isOpen, { trueValue: '1', falseValue: '0' });
  const visibility = useToggle(isOpen, { trueValue: 'visible', falseValue: 'hidden' });

  const DropdownItems = ({ option }) => {
    <ChakraButton>{option.text}</ChakraButton>;
  };

  return (
    <Box w="100%" pos="relative" ref={ref}>
      <VStack
        pos="absolute"
        maxH="28"
        w="100%"
        overflowY="auto"
        zIndex={zIndices.dropdown}
        spacing="0"
        transform="translateY(0.5rem)"
        opacity={opacity}
        visibility={visibility}
      >
        {options.map((option, index) => (
          <DropdownItems key={`${name}-option-${index}`} option={option} />
        ))}
      </VStack>
    </Box>
  );
};

export default forwardRef(DropdownTable);
