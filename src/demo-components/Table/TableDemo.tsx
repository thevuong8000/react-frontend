import { Link } from '@chakra-ui/layout';
import Table, { ITableColumn } from '@common/Table/Table';
import { EXTERNAL_LINK } from '@constants/routing';
import useChecklist from '@hooks/useChecklist';
import { MdDelete, MdEdit } from 'react-icons/md';
import React from 'react';
import { ICheckableItem } from '@hooks/useChecklist';

interface IRow extends ICheckableItem {
  link: string;
  type: string;
  id: string;
  freq: number;
}

const rows: IRow[] = [
  {
    link: EXTERNAL_LINK.FACEBOOK,
    type: 'Facebook',
    id: 'id-facebook',
    freq: 5
  },
  {
    link: EXTERNAL_LINK.GITHUB,
    type: 'Github',
    id: 'id-github',
    freq: 3
  },
  {
    link: EXTERNAL_LINK.LINKED_IN,
    type: 'Linked In',
    id: 'id-linkedin',
    freq: 4
  }
];

const FREQ_CODE = ['', '', '', 'always', 'sometimes', 'hardly'];

const TableDemo = () => {
  const { checkedItems, allChecked, toggleCheck, toggleAll, isChecked } = useChecklist<IRow>({
    initList: rows,
    idKey: 'id'
  });

  const colConfigs: ITableColumn<IRow>[] = [
    {
      headerText: 'No.',
      headerType: 'checkbox',
      headerCheckbox: {
        onClick: () => toggleAll(),
        checked: allChecked
      },

      cellType: 'checkbox',
      cellStyle: {
        width: '10%'
      },
      onCellClick: (row: IRow) => toggleCheck(row.id),
      cellChecked: (row: IRow) => isChecked(row.id)
    },

    {
      headerText: 'Social media',
      cellProp: 'link',
      mapValue: (value: string) => (
        <Link href={value} color="blue.400" isExternal>
          {value}
        </Link>
      ),
      cellStyle: {
        width: '40%'
      }
    },

    {
      headerText: 'Type',
      cellProp: 'type'
    },

    {
      headerText: 'Online Frequency',
      cellType: 'status',
      cellProp: 'freq',
      mapValue: (value: number) => FREQ_CODE[value]
    },

    {
      headerText: 'Actions',
      cellType: 'action',
      headerStyle: { textAlign: 'center' },
      buttons: [
        { icon: MdDelete, onClick: () => {}, title: 'delete', colorScheme: 'red' },
        { icon: MdEdit, onClick: () => {}, title: 'edit', colorScheme: 'teal' }
      ]
    }
  ];
  return <Table<IRow> colConfigs={colConfigs} rows={rows} />;
};

export default TableDemo;
