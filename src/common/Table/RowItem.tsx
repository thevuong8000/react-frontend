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
            onChange={(e) => col.onCellClick?.(row, rowIndex, e)}
            isChecked={col.cellChecked?.(row, rowIndex) ?? false}
            spacing={5}
            isDisabled={evalFV(col.cellDisabled, { row, rowIndex }) ?? false}
          >
            <Flex alignItems="center">
              <Text mr={1}>{col.cellProp ? row[col.cellProp] : rowIndex}</Text>
            </Flex>
          </Checkbox>
        );
      } else if (col.cellType === 'status' && col.cellProp) {
        content = (
          <Badge size="sm" colorScheme={getStatusColorCode(row[col.cellProp])}>
            <Tooltip label={evalFV(col.message, { row, rowIndex }) ?? ''}>
              <Text>{col.mapValue?.(row[col.cellProp], row, rowIndex) ?? row[col.cellProp]}</Text>
            </Tooltip>
          </Badge>
        );
      } else if (col.cellType === 'action' && col.buttons) {
        content = (
          <ButtonGroup display="flex" justifyContent="center">
            {col.buttons.map((btn, btnIndex) => {
              const {
                isHidden = false,
                onClick,
                title = '',
                colorScheme = 'gray',
                variant = 'ghost',
                isDisabled = false,
                text = ''
              } = btn;
              return !isHidden ? (
                <Tooltip key={`action-${rowIndex}-${colIndex}-${btnIndex}`} label={text}>
                  <Button
                    type="button"
                    onClick={() => onClick?.(row, rowIndex)}
                    title={title ?? ''}
                    disabled={evalFV(isDisabled, { row, rowIndex }) ?? false}
                    colorScheme={colorScheme}
                    variant={variant}
                  >
                    {btn.icon && <btn.icon size={20} />}
                  </Button>
                </Tooltip>
              ) : null;
            })}
          </ButtonGroup>
        );
      } else if (col.cellType === 'index') {
        content = (col.startIndex || 0) + rowIndex;
      } else if (!col.cellProp) {
        content = null;
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

export default memo(RowItem) as typeof RowItem;
