import React, { memo, PropsWithChildren, ReactElement } from 'react';
import { Tr, Td } from '@chakra-ui/table';
import { Button, ButtonGroup } from '@chakra-ui/button';
import { Badge, Flex, Text } from '@chakra-ui/layout';
import { Checkbox } from '@chakra-ui/checkbox';
import { Tooltip } from '@chakra-ui/tooltip';
import { getStatusColorCode } from './utils/table-helper';
import { ITableColumn } from './Table';
import { evalFV } from '../../utilities/helper';

interface IRowItem<T> {
  row: T;
  rowIndex: number;
  configs: ITableColumn<T>[];
}

const RowItem: <T>(props: PropsWithChildren<IRowItem<T>>) => ReactElement = ({
  row,
  rowIndex,
  configs
}) => (
  <Tr>
    {configs.map((col, colIndex) => {
      let content;
      if (col.cellType === 'checkbox') {
        content = (
          <Checkbox
            onChange={(e) => col.onCellClick(row, rowIndex, e)}
            isChecked={col.cellChecked(row, rowIndex)}
            spacing={5}
            isDisabled={evalFV(col.cellDisabled, { row, rowIndex })}
          >
            <Flex alignItems="center">
              <Text mr={1}>{col.cellProp ? row[col.cellProp] : rowIndex}</Text>
            </Flex>
          </Checkbox>
        );
      } else if (col.cellType === 'status') {
        content = (
          <Badge size="sm" colorScheme={getStatusColorCode(row[col.cellProp])}>
            <Tooltip label={evalFV(col.message, { row, rowIndex }) ?? ''}>
              <Text>{col.mapValue?.(row[col.cellProp], row, rowIndex) ?? row[col.cellProp]}</Text>
            </Tooltip>
          </Badge>
        );
      } else if (col.cellType === 'action') {
        content = (
          <ButtonGroup display="flex" justifyContent="center">
            {col.buttons.map((btn, btnIndex) =>
              !btn.isHidden ? (
                <Button
                  key={`action-${rowIndex}-${btnIndex}`}
                  type="button"
                  onClick={() => btn.onClick(row, rowIndex)}
                  title={btn.title}
                  disabled={evalFV(btn.isDisabled, { row, rowIndex })}
                  colorScheme={btn.colorScheme}
                  variant={btn.variant ?? 'ghost'}
                >
                  <btn.icon size={20} />
                </Button>
              ) : null
            )}
          </ButtonGroup>
        );
      } else if (col.cellType === 'index') {
        content = (col.startIndex || 0) + rowIndex;
      }
      // Default: Text
      else if (col.mapValue) {
        content = col.mapValue(row[col.cellProp], row, rowIndex);
      } else {
        content = row[col.cellProp];
      }

      return (
        <Td
          key={`row-item-${rowIndex}-${colIndex}`}
          pl="3"
          {...evalFV(col.cellStyle, { row, rowIndex })}
        >
          {content}
        </Td>
      );
    })}
  </Tr>
);

export default memo(RowItem);
