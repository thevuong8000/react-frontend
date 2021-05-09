import React, { memo } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/table';
import { Button, ButtonGroup } from '@chakra-ui/button';
import { Badge, Box, Center, Flex, Text } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { Checkbox } from '@chakra-ui/checkbox';
import { Tooltip } from '@chakra-ui/tooltip';
import { TEXT_COMMON } from '@constants/text';
import {
  any,
  arrayOf,
  bool,
  element,
  func,
  number,
  object,
  objectOf,
  oneOf,
  shape,
  string
} from 'prop-types';
import { getStatusColorCode } from './utils/table-helper';

export const TABLE_CELL_TYPE = {
  ACTION: 'action',
  CHECKBOX: 'checkbox',
  INDEX: 'index',
  LINK: 'link',
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
              <Text mr={1}>{col.cellProp ? row[col.cellProp] : ''}</Text>
            </Flex>
          </Checkbox>
        );
      } else if (col.cellType === TABLE_CELL_TYPE.STATUS) {
        content = (
          <Badge colorScheme={getStatusColorCode(row[col.cellProp])}>
            <Tooltip label={col?.message(row) ?? ''}>
              <Text>{col?.mapValue(row[col.cellProp], row, rowIndex) ?? row[col.cellProp]}</Text>
            </Tooltip>
          </Badge>
        );
      } else if (col.cellType === TABLE_CELL_TYPE.ACTION) {
        content = (
          <ButtonGroup display="flex" justifyContent="center">
            {col.buttons.map((btn, btnIndex) => {
              if (!btn.show || btn.show(row)) {
                return (
                  <Button
                    key={`action-${rowIndex}-${btnIndex}`}
                    type="button"
                    onClick={() => btn.onClick(row, rowIndex)}
                    title={btn.title}
                    disabled={btn.disabled && btn.disabled(row)}
                    colorScheme={btn.colorScheme}
                    variant={btn.variant ?? 'ghost'}
                  >
                    {btn.text ? <btn.text>{btn.text}</btn.text> : <btn.icon />}
                  </Button>
                );
              }
              return null;
            })}
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

const DataTable = memo(({ colConfigs = [], rows = [], loading, noResultText = '', error }) => (
  <Box boxShadow="xs" overflow="auto">
    <Table size="sm" variant="striped">
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
    </Table>
  </Box>
));

DataTable.propTypes = {
  colConfigs: arrayOf(
    shape({
      // Header Props
      headerType: oneOf(Object.values(TABLE_CELL_TYPE)),
      headerCheckbox: shape({
        onClick: func.isRequired,
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
      cellChecked: func.call({}, [any, number]),
      cellProp: string,
      cellStyle: objectOf(string),

      // Others
      component: element,
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

export default DataTable;
