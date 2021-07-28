import { Flex, Text } from '@chakra-ui/layout';
import { PageBase } from 'paging';
import React, { FC, useEffect } from 'react';

const Homepage: FC<PageBase> = ({ documentTitle }) => {
  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  return (
    <Flex direction="column">
      <Text>Hello World</Text>
    </Flex>
  );
};

export default Homepage;
