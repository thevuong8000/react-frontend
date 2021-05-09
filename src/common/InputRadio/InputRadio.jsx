import React from 'react';
import { Radio, RadioGroup } from '@chakra-ui/radio';
import { string, bool, any, func, arrayOf, shape } from 'prop-types';

const InputRadio = ({ name, value, options = [], onChange, isColumn, gap = '3', ...props }) => (
  <RadioGroup
    name={name}
    value={value}
    size="sm"
    colorScheme="green"
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

InputRadio.propTypes = {
  name: string,
  // eslint-disable-next-line react/forbid-prop-types
  value: any,
  options: arrayOf(
    shape({
      // eslint-disable-next-line react/forbid-prop-types
      value: any,
      text: string,
      isDisabled: bool
    })
  ),
  onChange: func.isRequired,
  isColumn: bool,
  gap: string
};

export default InputRadio;
