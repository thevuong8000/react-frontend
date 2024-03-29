import React, {
  ChangeEventHandler,
  FC,
  FocusEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState
} from 'react';
import { useBoolean } from '@chakra-ui/hooks';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { Flex } from '@chakra-ui/layout';
import { AnimatedChevron } from '@common';
import DropdownTable from '@common/Helper-Component/DropdownTable/DropdownTable';
import { includeStr } from '@utilities/helper';
import { IDropdownOption } from '../Helper-Component/DropdownTable/DropdownTable';

interface ISelector {
  name: string;
  selected: string | string[];
  options: IDropdownOption[];
  onSelect: (option: string) => void;
  isMultiple?: boolean;
}

const Selector: FC<ISelector> = ({
  name,
  selected, // selected option(s)
  options = [],
  onSelect,
  isMultiple = false, // multiple selection
  ...props
}) => {
  const [filterOptions, setFilterOptions] = useState<IDropdownOption[]>(options ?? []);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showOptions, setShowOptions] = useBoolean(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOptions = Array.isArray(selected) ? selected : [selected];
  const inputValue = selectedOptions.join(', ');

  useEffect(() => {
    setFilterOptions(options.filter((opt) => includeStr(opt.text, searchQuery)));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, searchQuery]);

  const _onShowOptions: FocusEventHandler = () => {
    if (showOptions) return;
    setShowOptions.on();
    setSearchQuery('');
  };

  const _closeOptions = () => {
    setShowOptions.off();
  };

  const _onInputBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    // Do not hide dropdown if click into dropdown or input-field
    if (dropdownRef.current?.contains(e.relatedTarget as Node)) {
      if (isMultiple) e.target.focus();
      return;
    }

    _closeOptions();
  };

  const _onSelect: MouseEventHandler<HTMLButtonElement> = (e) => {
    onSelect(e.currentTarget.value);
    if (!isMultiple) _closeOptions();
  };

  const _onSearchQueryChange: ChangeEventHandler<HTMLInputElement> = (e) => {
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
        isOpen={showOptions}
        selectedOptions={selectedOptions}
        onSelect={_onSelect}
      />
    </Flex>
  );
};

export default Selector;
