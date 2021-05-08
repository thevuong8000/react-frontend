import { forwardRef } from 'react';
import { Button as ChakraButton } from '@chakra-ui/button';
import { Box, Text, VStack } from '@chakra-ui/layout';
import { useColorModeValue, useTheme } from '@chakra-ui/system';
import useToggle from '@hooks/useToggle';
import { TiTick } from 'react-icons/ti';
import Icon from '@chakra-ui/icon';
import { Tooltip } from '@chakra-ui/tooltip';

const DropdownTable = (props, ref) => {
  const {
    name,
    selectedOptions = [],
    options = [], // { text: string, isDisable: boolean, Icon: React.Component }
    isOpen,
    onSelect
  } = props;

  const { zIndices } = useTheme();
  const opacity = useToggle(isOpen, { trueValue: '1', falseValue: '0' });
  const visibility = useToggle(isOpen, { trueValue: 'visible', falseValue: 'hidden' });

  const DropdownItems = ({ option }) => {
    const isChecked = selectedOptions.includes(option.text);
    const checkedVisibility = useToggle(isChecked, { trueValue: 'visible', falseValue: 'hidden' });
    return (
      <Tooltip label={option.text} hasArrow placement="auto">
        <ChakraButton
          w="100%"
          variant="ghost"
          colorScheme="gray"
          value={option.text}
          onClick={onSelect}
          pt="2"
          pb="2"
          justifyContent="space-between"
          isDisabled={option.isDisabled}
          leftIcon={option.icon}
        >
          <Text maxW="85%" textOverflow="ellipsis" overflow="hidden" pointerEvents="none">
            {option.text}
          </Text>
          <Icon as={TiTick} color="green" visibility={checkedVisibility} />
        </ChakraButton>
      </Tooltip>
    );
  };

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
        transition="all 0.1s ease"
      >
        {options.map((option, index) => (
          <DropdownItems key={`${name}-option-${index}`} option={option} />
        ))}
      </VStack>
    </Box>
  );
};

export default forwardRef(DropdownTable);
