import React, { ChangeEventHandler, useState } from 'react';
import { useBoolean } from '@chakra-ui/hooks';
import { Flex, Text } from '@chakra-ui/layout';
import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/slider';
import { InputRadio } from '@common';
import { SIZE } from '@constants/demo';
import { Checkbox } from '@chakra-ui/checkbox';
import { STYLE } from '../demo-helper/constants';
import { ThemeTypings } from '@chakra-ui/system';

const InputRadioDemo = () => {
  const [size, setSize] = useState(1);
  const [colorScheme, setColorScheme] = useState<ThemeTypings['colorSchemes']>('green');
  const [isColumn, setIsColumn] = useBoolean(false);

  const options = ['Naruto', 'Sakura', 'Sasuke'].map((item) => ({ text: item, value: item }));
  const [value, setValue] = useState(options[0].value);

  const _onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.currentTarget.value);
  };

  return (
    <Flex {...STYLE.DEMO_WRAPPER}>
      {/* Options */}
      <Flex {...STYLE.COMPONENT_OPTIONS}>
        {/* Size */}
        <Flex align="center">
          <Text mr="4">Size:</Text>
          <Slider w="28" value={size} onChange={(val) => setSize(val)} min={1} max={3}>
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

        {/* Column option */}
        <Flex>
          <Text mr="4">Column</Text>
          <Checkbox isChecked={isColumn} onChange={setIsColumn.toggle} />
        </Flex>
      </Flex>

      {/* Render Input Radio */}
      <Flex {...STYLE.COMPONENT_RENDER}>
        <InputRadio
          name="input-radio-demo"
          options={options}
          value={value}
          size={SIZE.DEFAULT[size]}
          colorScheme={colorScheme}
          isColumn={isColumn}
          onChange={_onChange}
        />
      </Flex>
    </Flex>
  );
};

export default InputRadioDemo;
