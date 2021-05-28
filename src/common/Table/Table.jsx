import React, { memo } from 'react';
import { Table as ChakraTable, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/table';
import { Button, ButtonGroup } from '@chakra-ui/button';
import { Badge, Box, Center, Flex, Text } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { Checkbox } from '@chakra-ui/checkbox';
import { Tooltip } from '@chakra-ui/tooltip';
import { TEXT_COMMON } from '@constants/text';
import { arrayOf, bool, func, number, object, objectOf, oneOf, shape, string } from 'prop-types';
import { getStatusColorCode } from './utils/table-helper';

export const TABLE_CELL_TYPE = {
  ACTION: 'action',
  CHECKBOX: 'checkbox',
  INDEX: 'index',
  STATUS: 'status',
  TEXT: 'text'
};

const Loader = ({ colSpan }) => (
  <Tr>
    <Td colSpan={colSpan}>
      <Center>
        <Spinner />
      </Center>
    </Td>
  </Tr>
);

const Headers = memo(({ configs }) =>
  configs.map((item, index) => {
    let content;

    if (item.headerType === TABLE_CELL_TYPE.CHECKBOX && item.headerCheckbox) {
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
        onClick={item.cellType !== TABLE_CELL_TYPE.CHECKBOX ? item.onHeaderClick : null}
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
  })
);

const RowItem = memo(({ row, rowIndex, configs }) => (
  <Tr>
    {configs.map((col, colIndex) => {
      let content;
      if (col.component) {
        content = col.component(row, rowIndex);
      } else if (col.cellType === TABLE_CELL_TYPE.CHECKBOX) {
        content = (
          <Checkbox
            onChange={(e) => col.onCellClick(row, rowIndex, e)}
            isChecked={col.cellChecked(row, rowIndex)}
            spacing={5}
            isDisabled={col.disabled ? col.disabled(row, rowIndex) : false}
          >
            <Flex alignItems="center">
              <Text mr={1}>{col.cellProp ? row[col.cellProp] : rowIndex}</Text>
            </Flex>
          </Checkbox>
        );
      } else if (col.cellType === TABLE_CELL_TYPE.STATUS) {
        content = (
          <Badge size="sm" colorScheme={getStatusColorCode(row[col.cellProp])}>
            <Tooltip label={col.message ? col.message(row) : ''}>
              <Text>
                {col.mapValue ? col.mapValue(row[col.cellProp], row, rowIndex) : row[col.cellProp]}
              </Text>
            </Tooltip>
          </Badge>
        );
      } else if (col.cellType === TABLE_CELL_TYPE.ACTION) {
        content = (
          <ButtonGroup display="flex" justifyContent="center">
            {col.buttons.map((btn, btnIndex) =>
              !btn.isHidden ? (
                <Button
                  key={`action-${rowIndex}-${btnIndex}`}
                  type="button"
                  onClick={() => btn.onClick(row, rowIndex)}
                  title={btn.title}
                  disabled={btn.disabled && btn.disabled(row)}
                  colorScheme={btn.colorScheme}
                  variant={btn.variant ?? 'ghost'}
                >
                  <btn.icon size={20} />
                </Button>
              ) : null
            )}
          </ButtonGroup>
        );
      } else if (col.cellType === TABLE_CELL_TYPE.INDEX) {
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
          style={typeof col.cellStyle === 'function' ? col.cellStyle(row, rowIndex) : col.cellStyle}
        >
          {content}
        </Td>
      );
    })}
  </Tr>
));

const Rows = memo(({ error, configs, rows, noResultText, loading }) => {
  if (error) {
    return (
      <Tr>
        <Td align="center" colSpan={configs.length}>
          <Center>{TEXT_COMMON.CANCEL}</Center>
        </Td>
      </Tr>
    );
  }

  if (!rows || rows.length <= 0) {
    return (
      <Tr>
        <Td align="center" colSpan={configs.length}>
          <Center>{!loading ? noResultText : ''}</Center>
        </Td>
      </Tr>
    );
  }

  return rows.map((row, rowIndex) => (
    <RowItem key={`row-${rowIndex}`} row={row} configs={configs} rowIndex={rowIndex} />
  ));
});

const Table = memo(({ colConfigs = [], rows = [], loading, noResultText = '', error }) => (
  <Box boxShadow="xs" overflow="auto">
    <ChakraTable size="sm" variant="striped">
      <Thead>
        <Tr>{!loading && <Headers configs={colConfigs} />}</Tr>
      </Thead>
      <Tbody>
        {loading ? (
          <Loader colConfigs={colConfigs} />
        ) : (
          <Rows
            rows={rows}
            configs={colConfigs}
            loading={loading}
            error={error}
            noResultText={noResultText}
          />
        )}
      </Tbody>
    </ChakraTable>
  </Box>
));

Table.propTypes = {
  colConfigs: arrayOf(
    shape({
      // Header Props
      headerType: oneOf(Object.values(TABLE_CELL_TYPE)),
      headerCheckbox: shape({
        onClick: func,
        checked: bool
      }),
      headerText: string,
      onHeaderClick: func,
      headerStyle: objectOf(string),
      // eslint-disable-next-line react/forbid-prop-types
      headerProps: object,

      // Cell Props
      cellType: oneOf(Object.values(TABLE_CELL_TYPE)),
      onCellClick: func,
      cellChecked: func,
      cellProp: string,
      cellStyle: objectOf(string),

      // Others
      component: func,
      disabled: bool || func,
      message: func,
      mapValue: func,

      buttons: arrayOf(
        shape({
          onClick: func,
          show: bool || func,
          title: string,
          disabled: bool || func,
          colorScheme: string,
          variant: string,
          text: string
        })
      ),
      startIndex: number
    })
  ),
  // eslint-disable-next-line react/forbid-prop-types
  rows: arrayOf(object),
  loading: bool,
  noResultText: string,
  error: string
};

export default Table;
