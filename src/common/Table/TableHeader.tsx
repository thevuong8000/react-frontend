import React, { FC, memo } from 'react';
import { Tr, Th } from '@chakra-ui/table';
import { Button } from '@chakra-ui/button';
import { Text } from '@chakra-ui/layout';
import { Checkbox } from '@chakra-ui/checkbox';
import { ITableHeader } from './Table';

const TableHeader: FC<{ configs: ITableHeader[] }> = ({ configs }) => (
  <Tr>
    {configs.map((item, index) => {
      let content;

      if (item.headerType === 'checkbox' && item.headerCheckbox) {
        content = (
          <Checkbox
            onChange={item.headerCheckbox.onClick}
            spacing={5}
            isChecked={item.headerCheckbox.checked}
          >
            <Text fontSize="sm">{item.headerText}</Text>
          </Checkbox>
        );
      } else {
        content = item.headerText;
      }

      return (
        <Th
          key={`header-col-${index}`}
          onClick={item.headerType !== 'checkbox' ? item.onHeaderClick : null}
          cursor={item.onHeaderClick ? 'pointer' : 'initial'}
          p={0}
          style={item.headerStyle}
          {...item.headerProps}
        >
          <Button
            size="sm"
            fontSize="sm"
            variant="ghost"
            leftIcon={item.headerIcon}
            _focus={{ outline: 'none' }}
          >
            {content}
          </Button>
        </Th>
      );
    })}
  </Tr>
);

export default memo(TableHeader);
