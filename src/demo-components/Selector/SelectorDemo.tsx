import React, { useEffect, useState } from 'react';
import { useBoolean } from '@chakra-ui/hooks';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/slider';
import { Selector } from '@common';
import { SIZE } from '@constants/demo';
import { Checkbox } from '@chakra-ui/checkbox';
import { STYLE } from '../demo-helper/constants';

const options = [
  { text: 'abc' },
  { text: 'abcd' },
  { text: 'abcde' },
  { text: 'abcdef' },
  { text: 'abcdefghj' },
  { text: 'aaaaaaaaaaa' },
  { text: 'aaab' }
];

/**
 * In practice, this should be
 * @type string
 * @type string[]
 */
type ISelectedOptions = any;

const SelectorDemo = () => {
  const [size, setSize] = useState(1);
  const [isMultiple, setIsMultiple] = useBoolean(false);

  const [selectedOptions, setSelectedOptions] = useState<ISelectedOptions>([]);

  useEffect(() => {
    setSelectedOptions([]);
  }, [isMultiple]);

  const _onSelectSingle = (value: string) => {
    setSelectedOptions(value);
  };

  const _onSelectMultiple = (value: string) => {
    setSelectedOptions((prevOpts: string[]) =>
      prevOpts.includes(value) ? prevOpts.filter((opt) => opt !== value) : [...prevOpts, value]
    );
  };

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

        {/* Multiple option */}
        <Flex>
          <Text mr="4">Multiple</Text>
          <Checkbox isChecked={isMultiple} onChange={setIsMultiple.toggle} />
        </Flex>
      </Flex>

      {/* Render Button */}
      <Flex {...STYLE.COMPONENT_RENDER}>
        <Box w="md">
          <Selector
            name="selector-demo"
            options={options}
            selected={selectedOptions || []}
            isMultiple={isMultiple}
            onSelect={isMultiple ? _onSelectMultiple : _onSelectSingle}
            placeholder="Select option(s)"
            size={SIZE.DEFAULT[size]}
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default SelectorDemo;
