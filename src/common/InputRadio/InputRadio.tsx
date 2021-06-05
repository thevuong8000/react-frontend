import React, { ChangeEventHandler, FC } from 'react';
import { Radio, RadioGroup } from '@chakra-ui/radio';

interface IRadioOption {
  text: string;
  value: string;
  isDisabled: boolean;
}

interface IInputRadio {
  name?: string;
  value: string;
  options: IRadioOption[];
  onChange: ChangeEventHandler;
  isColumn?: boolean;
  gap: '1' | '2' | '4' | '5' | '6' | '7' | '8';
}

const InputRadio: FC<IInputRadio> = ({
  name,
  value,
  options = [],
  onChange,
  isColumn,
  gap = '3',
  ...props
}) => (
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

export default InputRadio;
