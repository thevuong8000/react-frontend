import React from 'react';
import { Checkbox } from '@chakra-ui/checkbox';
import { string, any, func } from 'prop-types';

const InputCheckbox = ({ className, label, name, value, onChange, ...props }) => (
  <Checkbox
    {...props}
    className={className}
    name={name}
    value={value}
    size="md"
    colorScheme="teal"
    onChange={onChange}
    isChecked={!!value}
  >
    {label}
  </Checkbox>
);

InputCheckbox.propTypes = {
  className: string,
  label: string,
  name: string,
  // eslint-disable-next-line react/forbid-prop-types
  value: any.isRequired,
  onChange: func.isRequired
};

export default InputCheckbox;
