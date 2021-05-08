import { useBoolean } from '@chakra-ui/hooks';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/slider';
import Selector from '@common/Selector/Selector';
import React, { useState } from 'react';
import { STYLE } from '../demo-helper/constants';

const options = [
  { text: 'option 1' },
  { text: 'option 2' },
  { text: 'option 3' },
  { text: 'option 4' },
  { text: 'option 5' },
  { text: 'option 6' },
  { text: 'option 7' }
];

const SelectorDemo = () => {
  const [size, setSize] = useState(1);
  const [variant, setVariant] = useState('solid');
  const [colorScheme, setColorScheme] = useState('blue');
  const [isMultiple, setIsMultiple] = useBoolean(false);

  const [selectedOptions, setSelectedOptions] = useState('');

  const _onSelectSingle = (e) => {
    console.log(e.target);
    console.log(e.target.value);
    setSelectedOptions(e.target.value);
  };

  const _onSelectMultiple = (e) => {};

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
          <Selector
            name="selector-demo"
            options={options}
            selected={selectedOptions || []}
            onChange={isMultiple ? _onSelectMultiple : _onSelectSingle}
            placeholder="Select option(s)"
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default SelectorDemo;
