import { Box, Flex, Heading } from '@chakra-ui/layout';
import React, { useEffect } from 'react';
import ButtonDemo from './Button/ButtonDemo';
import InputTextDemo from './InputText/InputTextDemo';
import InputCheckboxDemo from './InputCheckbox/InputCheckboxDemo';
import TableDemo from './Table/TableDemo';
import InputRadioDemo from './InputRadio/InputRadioDemo';

const Demo = ({ title, children }) => (
  <Flex direction="column" w="100%">
    <Heading>{title}</Heading>
    <Box>{children}</Box>
  </Flex>
);

const items = [
  { title: 'Button', component: <ButtonDemo /> },
  { title: 'Input Text', component: <InputTextDemo /> },
  { title: 'Input Checkbox', component: <InputCheckboxDemo /> },
  { title: 'Input Radio', component: <InputRadioDemo /> },
  { title: 'Table', component: <TableDemo /> }
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
