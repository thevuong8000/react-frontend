import { useEffect, useRef, useState } from 'react';
import { useBoolean } from '@chakra-ui/hooks';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { Flex } from '@chakra-ui/layout';
import AnimatedChevron from '@common/AnimatedIcons/Chevron';
import DropdownTable from '@common/Helper-Component/DropdownTable/DropdownTable';
import { includeStr, joinStrings } from '@utilities/helper';
// import PropTypes from 'prop-types';

const Selector = ({
  name,
  selected, // string | string[]
  options = [], // { text: string, isDisable: boolean, Icon: React.Component }
  onChange,
  isMultiple = false, // multiple selection
  ...props
}) => {
  const [filterOptions, setFilterOptions] = useState(options ?? []);
  const [searchQuery, setSearchQuery] = useState('');
  const [showOptions, setShowOptions] = useBoolean(false);

  const dropdownRef = useRef();

  const selectedOptions = Array.isArray(selected) ? selected : [selected];
  const inputValue = joinStrings(selectedOptions);

  useEffect(() => {
    setFilterOptions(options.filter((opt) => includeStr(opt.text, searchQuery)));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const _onShowOptions = () => {
    if (showOptions) return;
    setShowOptions.on();
    setSearchQuery('');
  };

  const _closeOptions = () => {
    setShowOptions.off();
  };

  const _onInputBlur = (e) => {
    // Do not hide dropdown if click into dropdown or input-field
    if (dropdownRef.current.contains(e.relatedTarget)) {
      if (isMultiple) e.target.focus();
      return;
    }

    _closeOptions();
  };

  const _onSelect = (e) => {
    onChange(e);
    if (!isMultiple) _closeOptions();
  };

  const _onSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Flex direction="column" w="100%" pos="relative">
      <InputGroup name={name} w="100%">
        <Input
          id={`${name}-search-bar`}
          value={showOptions ? searchQuery : inputValue}
          autoComplete="off"
          spellCheck={false}
          size="sm" // sm | md | lg
          isDisabled={options.length <= 0}
          w="100%"
          borderRadius="md"
          onChange={_onSearchQueryChange}
          onFocus={_onShowOptions}
          onBlur={_onInputBlur}
          {...props}
        />
        <InputRightElement pointerEvents="none" h="100%">
          <AnimatedChevron isRotated={!showOptions} />
        </InputRightElement>
      </InputGroup>

      <DropdownTable
        ref={dropdownRef}
        name={name}
        options={filterOptions}
        isMultiple={isMultiple}
        isOpen={showOptions}
        selectedOptions={selectedOptions}
        onSelect={_onSelect}
      />
    </Flex>
  );
};

// Selector.propTypes = {
//   name: PropTypes.string,
//   selected: PropTypes.arrayOf(PropTypes.string).isRequired,
//   options: PropTypes.arrayOf(PropTypes.string).isRequired,
//   onChange: PropTypes.func.isRequired,
//   isMultiple: PropTypes.bool,
//   placeholder: PropTypes.string
// };

export default Selector;
