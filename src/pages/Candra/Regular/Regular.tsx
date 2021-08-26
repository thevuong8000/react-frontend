import { Flex, Text, ThemeTypings } from '@chakra-ui/react';
import React, { FC } from 'react';

interface IRegularSuccess {
  status: 'Success';
  detail: string;
}

interface IRegularFailure {
  status: 'Compile Error' | 'Runtime Error';
  detail: string;
}

export type IRegular = Partial<IRegularSuccess | IRegularFailure>;

const getColorSchemeByStatus = (status: IRegular['status']): ThemeTypings['colorSchemes'] => {
  switch (status) {
    case 'Success':
      return 'green';

    case 'Compile Error':
    case 'Runtime Error':
      return 'red';

    default:
      return 'gray';
  }
};

const Regular: FC<IRegular> = ({ status, detail }) => {
  const colorScheme = getColorSchemeByStatus(status);
  return (
    <Flex>
      <Text colorScheme={colorScheme}>{status}</Text>
      <Text>{detail}</Text>
    </Flex>
  );
};

export default Regular;
