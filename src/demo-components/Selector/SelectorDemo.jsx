import { Box, Flex, Text } from '@chakra-ui/layout';
import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/slider';
import Selector from '@common/Selector/Selector';
import React, { useState } from 'react';
import { STYLE } from '../demo-helper/constants';

const options = [
  { value: 'option 1', text: 'option 1' },
  { value: 'option 2', text: 'option 2' },
  { value: 'option 3', text: 'option 3' },
  { value: 'option 4', text: 'option 4' },
  { value: 'option 5', text: 'option 5' },
  { value: 'option 6', text: 'option 6' },
  { value: 'option 7', text: 'option 7' }
];

const SelectorDemo = () => {
  const [size, setSize] = useState(1);
  const [variant, setVariant] = useState('solid');
  const [colorScheme, setColorScheme] = useState('blue');
  return (
    <Flex {...STYLE.DEMO_WRAPPER}>
      {/* Options */}
      <Flex {...STYLE.COMPONENT_OPTIONS}>
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

      {/* Render Button */}
      <Flex {...STYLE.COMPONENT_RENDER}>
        <Box w="md">
          <Selector name="selector-demo" options={options} />
        </Box>
      </Flex>
    </Flex>
  );
};

export default SelectorDemo;
