import { Flex, Text } from '@chakra-ui/layout';
import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/slider';
import Button from '@common/Button/Button';
import { SIZE } from '@constants/demo';
import React, { useState } from 'react';

const ButtonDemo = () => {
  const [size, setSize] = useState(1);
  const [variant, setVariant] = useState('solid');
  const [colorScheme, setColorScheme] = useState('blue');
  return (
    <Flex direction="row" w="100%" justifyContent="space-between" align="center">
      <Flex direction="column">
        {/* Size */}
        <Flex align="center">
          <Text mr="4">Size:</Text>
          <Slider w="28" value={size} onChange={(val) => setSize(val)} min={0} max={3}>
            <SliderTrack>
              <SliderFilledTrack bg="tomato" />
            </SliderTrack>
            <SliderThumb boxSize={3} bg="tomato" />
          </Slider>
        </Flex>

        {/* Variant */}
        <Flex>
          <Text mr="4">Variant:</Text>
        </Flex>

        {/* Color Scheme */}
        <Flex>
          <Text mr="4">Color Scheme:</Text>
        </Flex>
      </Flex>
      <Flex w="50%" align="center" justifyContent="center">
        <Button size={SIZE.DEFAULT[size]} variant={variant} colorScheme={colorScheme}>
          Button
        </Button>
      </Flex>
    </Flex>
  );
};

export default ButtonDemo;
