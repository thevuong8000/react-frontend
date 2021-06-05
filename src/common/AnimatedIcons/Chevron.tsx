import React, { FC } from 'react';
import Icon from '@chakra-ui/icon';
import { BsChevronDown } from 'react-icons/bs';

interface IChevron {
  isRotated: boolean;
}

const AnimatedChevron: FC<IChevron> = ({ isRotated }) => (
  <Icon
    as={BsChevronDown}
    transform={`rotate(${isRotated ? 0 : 180}deg)`}
    transition="all 0.3s ease"
  />
);

export default AnimatedChevron;
