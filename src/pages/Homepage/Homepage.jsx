import { Flex, Text } from '@chakra-ui/layout';
import React, { useEffect } from 'react';

const Homepage = ({ documentTitle }) => {
  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  return (
    <Flex>
      <Text>Hello there!</Text>
    </Flex>
  );
};

export default Homepage;
