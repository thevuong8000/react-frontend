import { Button } from '@chakra-ui/button';
import React from 'react';

const DEFAULT_STYLE = {
  width: '100%'
};
const Form = ({ children, style, onSubmit, ...props }) => (
  <form onSubmit={onSubmit} style={{ ...DEFAULT_STYLE, ...style }} {...props}>
    {children}
    <Button type="submit" d="none" />
  </form>
);

export default Form;
