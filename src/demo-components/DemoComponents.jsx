import { Flex, Heading } from '@chakra-ui/layout';
import React, { useEffect } from 'react';

const Demo = ({ title, children }) => (
  <Flex>
    <Heading>{title}</Heading>
    {children}
  </Flex>
);

const DemoComponents = ({ documentTitle }) => {
  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  return (
    <Flex>
      <div>Demo Components</div>
    </Flex>
  );
};

export default DemoComponents;
