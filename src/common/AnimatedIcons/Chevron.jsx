import Icon from '@chakra-ui/icon';
import { BsChevronDown } from 'react-icons/bs';
import PropTypes from 'prop-types';

const AnimatedChevron = ({ isRotated }) => (
  <Icon
    as={BsChevronDown}
    transform={`rotate(${isRotated ? 0 : 180}deg)`}
    transition="all 0.3s ease"
  />
);

const { bool } = PropTypes;
AnimatedChevron.propTypes = {
  isRotated: bool.isRequired
};

export default AnimatedChevron;
