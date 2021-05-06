import { Radio, RadioGroup } from '@chakra-ui/radio';
import React from 'react';

const InputRadio = ({
  name,
  value,
  options = [], // { value: string | number | boolean, text: string }, value must be unique
  size = 'sm', // sm | md | lg
  colorScheme = 'green', // green | orange | pink | purple | red | teal | yellow
  onChange,
  isColumn,
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
    {...props}
  >
    {options.map((option, index) => (
      <Radio
        key={`radio-${name}-${index}`}
        value={option.value}
        onChange={onChange}
        isDisabled={option.isDisabled}
        cursor="pointer"
      >
        {option.text}
      </Radio>
    ))}
  </RadioGroup>
);

export default InputRadio;
