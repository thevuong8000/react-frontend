import React from 'react';
import { Button as ChakraButton } from '@chakra-ui/button';

const Button = ({
  className,
  type = 'button',
  size = 'xs', // xs | sm | md | lg
  variant = 'solid',
  colorScheme = 'blue', // teal | blue | cyan | green | orange | pink | purple | red | yellow
  leftIcon = null,
  rightIcon = null,
  children,
  ...props
}) => (
  <ChakraButton
    className={className}
    type={type}
    size={size}
    variant={variant}
    leftIcon={leftIcon}
    colorScheme={colorScheme}
    rightIcon={rightIcon}
    {...props}
  >
    {children}
  </ChakraButton>
);

export default Button;
