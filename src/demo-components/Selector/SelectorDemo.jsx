import { useBoolean } from '@chakra-ui/hooks';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/slider';
import InputCheckbox from '@common/InputCheckbox/InputCheckbox';
import Selector from '@common/Selector/Selector';
import { SIZE } from '@constants/demo';
import { useEffect, useState } from 'react';
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

const SelectorDemo = () => {
  const [size, setSize] = useState(1);
  const [isMultiple, setIsMultiple] = useBoolean(false);

  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    setSelectedOptions([]);
  }, [isMultiple]);

  const _onSelectSingle = (e) => {
    setSelectedOptions(e.target.value);
  };

  const _onSelectMultiple = (e) => {
    const { value } = e.target;
    setSelectedOptions((prevOpts) =>
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
          <InputCheckbox value={isMultiple} onChange={setIsMultiple.toggle} />
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
            onChange={isMultiple ? _onSelectMultiple : _onSelectSingle}
            placeholder="Select option(s)"
            size={SIZE.DEFAULT[size]}
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default SelectorDemo;
