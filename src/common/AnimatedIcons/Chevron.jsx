import Icon from '@chakra-ui/icon';
import React from 'react';
import { BsChevronDown } from 'react-icons/bs';

const AnimatedChevron = ({ isRotated }) => (
  <Icon
    as={BsChevronDown}
    transform={`rotate(${isRotated ? 0 : 180}deg)`}
    transition="all 0.3s ease"
  />
);

export default AnimatedChevron;
