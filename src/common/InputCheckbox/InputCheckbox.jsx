import { Checkbox } from '@chakra-ui/checkbox';
import PropTypes from 'prop-types';

const InputCheckbox = ({
  className,
  label,
  name,
  value,
  colorScheme = 'teal', // teal | blue | cyan | green | orange | pink | purple | red | yellow
  size = 'md', // xs | sm | md | lg
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
    isChecked={!!value}
  >
    {label}
  </Checkbox>
);

const { string, any, func } = PropTypes;
InputCheckbox.propTypes = {
  className: string,
  label: string.isRequired,
  name: string,
  // eslint-disable-next-line react/forbid-prop-types
  value: any.isRequired,
  onChange: func.isRequired
};

export default InputCheckbox;
