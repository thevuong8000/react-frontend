import { Link } from '@chakra-ui/layout';
import Table, { TABLE_CELL_TYPE } from '@common/Table/Table';
import { EXTERNAL_LINK } from '@constants/routing';
import useChecklist from '@hooks/useChecklist';
import { MdDelete, MdEdit } from 'react-icons/md';
import React from 'react';

const rows = [
  {
    link: EXTERNAL_LINK.FACEBOOK,
    type: 'Facebook',
    id: 'id-facebook'
  },
  {
    link: EXTERNAL_LINK.GITHUB,
    type: 'Github',
    id: 'id-github'
  },
  {
    link: EXTERNAL_LINK.LINKED_IN,
    type: 'Linked In',
    id: 'id-linkedin'
  }
];

const TableDemo = () => {
  const { checkedItems, allChecked, toggleCheck, toggleCheckAll, isChecked } = useChecklist({
    initList: rows,
    idKey: 'id'
  });

  const colConfigs = [
    {
      headerText: 'No.',
      headerType: TABLE_CELL_TYPE.CHECKBOX,
      headerCheckbox: {
        onClick: toggleCheckAll,
        isChecked: allChecked
      },

      cellType: TABLE_CELL_TYPE.CHECKBOX,
      onCellClick: (row) => toggleCheck(row.id),
      cellChecked: (row) => isChecked(row.id)
    },

    {
      headerText: 'Social media',
      component: (row) => (
        <Link href={row.link} color="blue.400" isExternal>
          {row.link}
        </Link>
      )
    },

    {
      headerText: 'Type',
      cellProp: 'type'
    },

    {
      headerText: 'Actions',
      cellType: TABLE_CELL_TYPE.ACTION,
      buttons: [
        { icon: MdDelete, onClick: () => {}, title: 'delete', colorScheme: 'red' },
        { icon: MdEdit, onClick: () => {}, title: 'edit', colorScheme: 'teal' }
      ]
    }
  ];
  return <Table colConfigs={colConfigs} rows={rows} />;
};

export default TableDemo;
