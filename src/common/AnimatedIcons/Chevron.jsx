import Icon from '@chakra-ui/icon';
import { BsChevronDown } from 'react-icons/bs';
import { bool } from 'prop-types';

const AnimatedChevron = ({ isRotated }) => (
  <Icon
    as={BsChevronDown}
    transform={`rotate(${isRotated ? 0 : 180}deg)`}
    transition="all 0.3s ease"
  />
);

AnimatedChevron.propTypes = {
  isRotated: bool
};

export default AnimatedChevron;
