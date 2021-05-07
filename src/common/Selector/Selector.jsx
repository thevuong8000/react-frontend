import { useBoolean } from '@chakra-ui/hooks';
import { Input, InputGroup } from '@chakra-ui/input';
import { Flex } from '@chakra-ui/layout';
import DropdownTable from '@common/Helper-Component/DropdownTable/DropdownTable';
import { includeStr, joinStrings } from '@utilities/helper';
import React, { useEffect, useRef, useState } from 'react';

const Selector = ({
  name,
  value,
  options = [], // { value: any, text: string, isDisable: boolean, Icon: React.Component }
  onChange,
  isMultiple, // multiple selection
  placeholder,
  isSelected, // (item, value) => boolean: Check if {item} in {value}
  valueToString, // (value) => string
  ...props
}) => {
  const [filterOptions, setFilterOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showOptions, setShowOptions] = useBoolean(false);

  const dropdownRef = useRef();

  // Default functions
  const _valueToString = valueToString ?? joinStrings;

  useEffect(() => {
    setFilterOptions(options ?? []);
  }, [options]);

  useEffect(() => {
    setFilterOptions(options.filter((opt) => includeStr(opt.text, searchQuery)));
  }, [searchQuery]);

  const _onShowOptions = () => {
    if (showOptions) return;
    setShowOptions.on();
    setSearchQuery('');
  };

  const _onInputBlur = (e) => {
    // Do not hide dropdown if click into dropdown or input-field
    if (dropdownRef.current.contains(e.relatedTarget) && isMultiple) {
      e.target.focus();
      return;
    }

    setShowOptions.off();
    setSearchQuery(_valueToString(value));
  };

  const _onSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Flex direction="column" w="100%" pos="relative">
      <InputGroup name={name} w="100%">
        <Input
          id={`${name}-search-bar`}
          value={searchQuery}
          autoComplete="off"
          spellCheck={false}
          size="sm" // sm | md | lg
          isDisabled={options.length <= 0}
          w="100%"
          onChange={_onSearchQueryChange}
          onFocus={_onShowOptions}
          onBlur={_onInputBlur}
          {...props}
        />
      </InputGroup>

      <DropdownTable
        ref={dropdownRef}
        name={name}
        options={filterOptions}
        isMultiple={isMultiple}
        isOpen={showOptions}
        value={value}
        onSelect={() => {}}
      />
    </Flex>
  );
};

export default Selector;
