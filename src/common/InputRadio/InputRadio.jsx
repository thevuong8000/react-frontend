import { Radio, RadioGroup } from '@chakra-ui/radio';
import React from 'react';

const InputRadio = ({
  name,
  value,
  options = [], // { value: any, text: string, isDisabled }, value must be unique
  size = 'sm', // sm | md | lg
  colorScheme = 'green', // green | orange | pink | purple | red | teal | yellow
  onChange,
  isColumn,
  gap = '3',
  ...props
}) => (
  <RadioGroup
    name={name}
    value={value}
    size={size}
    colorScheme={colorScheme}
    d="flex"
    flexDir={isColumn ? 'column' : 'row'}
    flexWrap="wrap"
    gridGap={gap}
    {...props}
  >
    {options.map((option, index) => (
      <Radio
        key={`radio-${name}-${index}`}
        value={option.value}
        onChange={onChange}
        isDisabled={option.isDisabled}
        spacing="1.5"
        cursor="pointer"
      >
        {option.text}
      </Radio>
    ))}
  </RadioGroup>
);

export default InputRadio;
