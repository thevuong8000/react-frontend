import React, { memo, PropsWithChildren, ReactElement } from 'react';
import { Tr, Td } from '@chakra-ui/table';
import { Center } from '@chakra-ui/layout';
import { TEXT_COMMON } from '@constants/text';
import { ITable } from './Table';
import RowItem from '../Table/RowItem';

const TableRows: <T>(props: PropsWithChildren<ITable<T>>) => ReactElement = ({
  error,
  colConfigs,
  rows,
  noResultText,
  isLoading
}) => {
  if (error) {
    return (
      <Tr>
        <Td align="center" colSpan={colConfigs.length}>
          <Center>{TEXT_COMMON.CANCEL}</Center>
        </Td>
      </Tr>
    );
  }

  if (!rows || rows.length <= 0) {
    return (
      <Tr>
        <Td align="center" colSpan={colConfigs.length}>
          <Center>{!isLoading ? noResultText : ''}</Center>
        </Td>
      </Tr>
    );
  }

  return (
    <>
      {rows.map((row, rowIndex) => (
        <RowItem key={`row-${rowIndex}`} row={row} configs={colConfigs} rowIndex={rowIndex} />
      ))}
    </>
  );
};

export default memo(TableRows) as typeof TableRows;
