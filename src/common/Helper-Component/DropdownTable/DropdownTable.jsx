import { Button as ChakraButton } from '@chakra-ui/button';
import { Box, VStack } from '@chakra-ui/layout';
import { useColorModeValue, useTheme } from '@chakra-ui/system';
import useToggle from '@hooks/useToggle';
import React, { forwardRef } from 'react';

const DropdownTable = (props, ref) => {
  const {
    name,
    selectedOptions = [],
    options = [], // { value: any, text: string, isDisable: boolean, Icon: React.Component }
    isOpen,
    onSelect,
    isMultiple
  } = props;

  const { zIndices } = useTheme();
  const opacity = useToggle(isOpen, { trueValue: '1', falseValue: '0' });
  const visibility = useToggle(isOpen, { trueValue: 'visible', falseValue: 'hidden' });

  const DropdownItems = ({ option }) => (
    <ChakraButton w="100%" variant="ghost" colorScheme="gray" onClick={onSelect} p="2">
      {option.text}
    </ChakraButton>
  );

  return (
    <Box w="100%" pos="relative" ref={ref}>
      <VStack
        pos="absolute"
        maxH="52"
        w="100%"
        overflowY="auto"
        zIndex={zIndices.dropdown}
        spacing="0"
        shadow="md"
        borderWidth="thin"
        borderColor={useColorModeValue('gray.200', 'gray.600')}
        borderRadius="md"
        transform="translateY(0.5rem)"
        opacity={opacity}
        visibility={visibility}
        transition="all 0.3s ease"
      >
        {options.map((option, index) => (
          <DropdownItems key={`${name}-option-${index}`} option={option} />
        ))}
      </VStack>
    </Box>
  );
};

export default forwardRef(DropdownTable);
