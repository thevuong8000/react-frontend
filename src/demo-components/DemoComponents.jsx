import { Box, Flex, Heading } from '@chakra-ui/layout';
import React, { useEffect } from 'react';
import InputTextDemo from './InputText/InputTextDemo';
import InputCheckboxDemo from './InputCheckbox/InputCheckboxDemo';
import TableDemo from './Table/TableDemo';
import InputRadioDemo from './InputRadio/InputRadioDemo';
import SelectorDemo from './Selector/SelectorDemo';

const Demo = ({ title, children }) => (
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

const items = [
  { title: COMPONENT_NAME.SELECTOR, component: <SelectorDemo /> },
  { title: COMPONENT_NAME.INPUT_TEXT, component: <InputTextDemo /> },
  { title: COMPONENT_NAME.INPUT_CHECKBOX, component: <InputCheckboxDemo /> },
  { title: COMPONENT_NAME.INPUT_RADIO, component: <InputRadioDemo /> },
  { title: COMPONENT_NAME.TABLE, component: <TableDemo /> }
];

const DemoComponents = ({ documentTitle }) => {
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
