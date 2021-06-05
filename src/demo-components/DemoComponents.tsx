import { Box, Flex, Heading } from '@chakra-ui/layout';
import React, { FC, ReactNode, useEffect } from 'react';
import TableDemo from './Table/TableDemo';
import InputRadioDemo from './InputRadio/InputRadioDemo';
import SelectorDemo from './Selector/SelectorDemo';
import { PageBase } from '@pages';

interface IDemo {
  title: string;
}

interface IDemoItem extends IDemo {
  component: ReactNode;
}

const Demo: FC<IDemo> = ({ title, children }) => (
  <Flex direction="column" w="100%">
    <Heading>{title}</Heading>
    <Box>{children}</Box>
  </Flex>
);

const COMPONENT_NAME = {
  INPUT_TEXT: 'Input Text',
  INPUT_CHECKBOX: 'Input Checkbox',
  INPUT_RADIO: 'Input Radio',
  TABLE: 'Table',
  SELECTOR: 'Selector'
};

const items: Array<IDemoItem> = [
  { title: COMPONENT_NAME.SELECTOR, component: <SelectorDemo /> },
  { title: COMPONENT_NAME.INPUT_RADIO, component: <InputRadioDemo /> },
  { title: COMPONENT_NAME.TABLE, component: <TableDemo /> }
];

const DemoComponents: FC<PageBase> = ({ documentTitle }) => {
  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  return (
    <Flex p="10" direction="column" gridGap="10">
      {items.map((item, index) => (
        <Demo key={`demo-component-${index}`} title={item.title}>
          {item.component}
        </Demo>
      ))}
    </Flex>
  );
};

export default DemoComponents;