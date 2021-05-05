import { Box, Flex, Heading } from '@chakra-ui/layout';
import React, { useEffect } from 'react';
import ButtonDemo from './Button/ButtonDemo';

const Demo = ({ title, children }) => (
  <Flex direction="column" w="100%">
    <Heading>{title}</Heading>
    <Box>{children}</Box>
  </Flex>
);

const items = [{ title: 'Button', component: <ButtonDemo /> }];

const DemoComponents = ({ documentTitle }) => {
  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  return (
    <Flex>
      {items.map((item, index) => (
        <Demo key={`demo-component-${index}`} title={item.title}>
          {item.component}
        </Demo>
      ))}
    </Flex>
  );
};

export default DemoComponents;
