import React, { CSSProperties, FC, forwardRef, MouseEventHandler, ReactElement } from 'react';
import { Button } from '@chakra-ui/button';
import { Box, Text, VStack } from '@chakra-ui/layout';
import { useColorModeValue, useTheme } from '@chakra-ui/system';
import useToggle from '@hooks/useToggle';
import { TiTick } from 'react-icons/ti';
import ChakraIcon from '@chakra-ui/icon';
import { Tooltip } from '@chakra-ui/tooltip';

export interface IDropdownOption {
  text: string;
  isDisabled?: boolean;
  Icon?: ReactElement;
}

interface IDropdown {
  name?: string;
  selectedOptions: string[];
  options: IDropdownOption[];
  isOpen: boolean;
  onSelect: MouseEventHandler<EventTargetBase>;
}

const DropdownTable = forwardRef<HTMLDivElement, IDropdown>((props, ref) => {
  const { name, selectedOptions = [], options = [], isOpen, onSelect } = props;

  const { zIndices } = useTheme();
  const opacity = useToggle(isOpen, { trueValue: '1', falseValue: '0' });
  const visibility = useToggle<VisibilityState>(isOpen, {
    trueValue: 'visible',
    falseValue: 'hidden'
  });

  const DropdownItems: FC<IDropdownOption> = ({ text, isDisabled, Icon }) => {
    const isChecked = selectedOptions.includes(text);
    const checkedVisibility = useToggle<VisibilityState>(isChecked, {
      trueValue: 'visible',
      falseValue: 'hidden'
    });
    return (
      <Tooltip label={text} hasArrow placement="auto">
        <Button
          w="100%"
          variant="ghost"
          colorScheme="gray"
          size="sm"
          value={text}
          onClick={onSelect}
          pt="2"
          pb="2"
          justifyContent="space-between"
          isDisabled={isDisabled}
          leftIcon={Icon}
        >
          <Text maxW="85%" textOverflow="ellipsis" overflow="hidden" pointerEvents="none">
            {text}
          </Text>
          <ChakraIcon as={TiTick} color="green" visibility={checkedVisibility} />
        </Button>
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
          <DropdownItems
            key={`${name}-option-${index}`}
            text={option.text}
            isDisabled={option.isDisabled}
            Icon={option.Icon}
          />
        ))}
      </VStack>
    </Box>
  );
});

export default DropdownTable;
