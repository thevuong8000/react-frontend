import React from 'react';
import { Checkbox } from '@chakra-ui/checkbox';

const InputCheckbox = ({
  className,
  label,
  name,
  value,
  colorScheme = 'teal', // teal | blue | cyan | green | orange | pink | purple | red | yellow
  size = 'md', // xs | sm | md | lg
  isRequired,
  isDisabled,
  onChange,
  ...props
}) => (
  <Checkbox
    {...props}
    className={className}
    name={name}
    value={value}
    size={size}
    colorScheme={colorScheme}
    onChange={onChange}
    isRequired={isRequired}
    isDisabled={isDisabled}
    isChecked={!!value}
  >
    {label}
  </Checkbox>
);

export default InputCheckbox;
