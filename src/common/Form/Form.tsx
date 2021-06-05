import { Button } from '@chakra-ui/button';
import React, { CSSProperties, FC, FormEvent } from 'react';

interface IForm {
  style: CSSProperties;
  onSubmit(e: FormEvent): void;

  // others
  [key: string]: any;
}

const DEFAULT_STYLE = {
  width: '100%'
};
const Form: FC<IForm> = ({ children, style, onSubmit, ...props }) => (
  <form onSubmit={onSubmit} style={{ ...DEFAULT_STYLE, ...style }} {...props}>
    {children}
    <Button type="submit" d="none" />
  </form>
);

export default Form;
