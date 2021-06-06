import React, {
  ChangeEvent,
  ChangeEventHandler,
  CSSProperties,
  FC,
  memo,
  MouseEventHandler,
  ReactElement
} from 'react';
import { Table as ChakraTable, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/table';
import { Box, Center } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { TableCellProps, TableColumnHeaderProps, ThemingProps } from '@chakra-ui/react';
import { IconType } from 'react-icons/lib';
import TableHeader from '@common/Table/TableHeader';
import TableRows from '@common/Table/TableRows';

export const TABLE_CELL_TYPE = {
  ACTION: 'action' as const,
  CHECKBOX: 'checkbox' as const,
  INDEX: 'index' as const,
  STATUS: 'status' as const,
  TEXT: 'text' as const
};

const CELL_VALUES = Object.values(TABLE_CELL_TYPE);
type Cell = typeof CELL_VALUES[number];

interface ActionButton<T = {}> {
  text?: string;
  onClick?: (row: T, rowIndex: number) => void;
  isHidden: boolean;
  title?: string;
  isDisabled?: FunctionValue<boolean, { row: T; rowIndex: number }>;
  colorScheme?: ThemeTypings['colorSchemes'];
  variant?: ThemingProps<'Button'>['variant'];
  icon?: IconType;
}

export interface ITableHeader {
  headerType?: Cell;
  headerCheckbox?: {
    onClick?: ChangeEventHandler;
    checked?: boolean;
  };
  headerText?: string;
  onHeaderClick?: MouseEventHandler;
  headerStyle?: CSSProperties;
  headerProps?: TableColumnHeaderProps;
  headerIcon?: ReactElement;
}

export interface ITableCell<T extends {}> {
  cellType?: Cell;
  onCellClick?: { (row: T, rowIndex: number, e: ChangeEvent): void };
  cellChecked: { (row: T, rowIndex: number): boolean };
  cellProp?: keyof T;
  cellStyle?: FunctionValue<TableCellProps, { row?: T; rowIndex?: number }>;
  cellDisabled?: FunctionValue<boolean, { row?: T; rowIndex?: number }>;
}

export interface ITableColumn<T extends {}> extends ITableHeader, ITableCell<T> {
  message?: FunctionValue<string, { row?: T; rowIndex?: number }>;
  mapValue?: { (value: any, row: T, rowIndex: number): any };

  buttons?: ActionButton<T>[];

  startIndex?: number;
}

export interface ITable<T extends {}> {
  colConfigs: ITableColumn<T>[];
  rows: T[];
  isLoading?: boolean;
  noResultText?: string;
  error?: string;
}

const Loader: FC<{ colSpan: number }> = ({ colSpan }) => (
  <Tr>
    <Td colSpan={colSpan}>
      <Center>
        <Spinner />
      </Center>
    </Td>
  </Tr>
);

const Table = memo(({ colConfigs = [], rows = [], loading, noResultText = '', error }) => (
  <Box boxShadow="xs" overflow="auto">
    <ChakraTable size="sm" variant="striped">
      <Thead>{!loading && <TableHeader configs={colConfigs} />}</Thead>
      <Tbody>
        {loading ? (
          <Loader colConfigs={colConfigs.length} />
        ) : (
          <TableRows
            rows={rows}
            colConfigs={colConfigs}
            isLoading={loading}
            error={error}
            noResultText={noResultText}
          />
        )}
      </Tbody>
    </ChakraTable>
  </Box>
));

export default Table;
