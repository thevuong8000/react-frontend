import React, {
  ChangeEvent,
  ChangeEventHandler,
  CSSProperties,
  FC,
  memo,
  MouseEventHandler,
  PropsWithChildren,
  ReactElement
} from 'react';
import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Td,
  TableCellProps,
  TableColumnHeaderProps
} from '@chakra-ui/table';
import { Box, Center } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { ThemeTypings, ThemingProps } from '@chakra-ui/system';
import { IconType } from 'react-icons/lib';
import TableHeader from '../Table/TableHeader';
import TableRows from '../Table/TableRows';

type Cell = 'action' | 'checkbox' | 'index' | 'status';

interface ActionButton<T = {}> {
  text?: string;
  onClick?: (row: T, rowIndex: number) => void;
  isHidden?: boolean;
  title?: string;
  isDisabled?: boolean;
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
  cellChecked?: { (row: T, rowIndex: number): boolean };
  cellProp?: keyof T;
  cellStyle?: TableCellProps;
  cellDisabled?: boolean;
}

export interface ITableColumn<T extends {}> extends ITableHeader, ITableCell<T> {
  message?: string;
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

const Table: <T>(props: PropsWithChildren<ITable<T>>) => ReactElement = ({
  colConfigs = [],
  rows = [],
  isLoading = false,
  noResultText = '',
  error = ''
}) => (
  <Box boxShadow="xs" overflow="auto">
    <ChakraTable size="sm" variant="striped">
      <Thead>{!isLoading && <TableHeader configs={colConfigs} />}</Thead>
      <Tbody>
        {isLoading ? (
          <Loader colSpan={colConfigs.length} />
        ) : (
          <TableRows
            rows={rows}
            colConfigs={colConfigs}
            isLoading={isLoading}
            error={error}
            noResultText={noResultText}
          />
        )}
      </Tbody>
    </ChakraTable>
  </Box>
);

export default memo(Table) as typeof Table;
