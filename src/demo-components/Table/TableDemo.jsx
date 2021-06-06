import { Link } from '@chakra-ui/layout';
import Table from '@common/Table/Table';
import { EXTERNAL_LINK } from '@constants/routing';
import useChecklist from '@hooks/useChecklist';
import { MdDelete, MdEdit } from 'react-icons/md';
import React from 'react';

const rows = [
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

const FREQ_CODE = {
  5: 'hardly',
  3: 'always',
  4: 'sometimes'
};

const TableDemo = () => {
  const { checkedItems, allChecked, toggleCheck, toggleAll, isChecked } = useChecklist({
    initList: rows,
    idKey: 'id'
  });

  const colConfigs = [
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
      onCellClick: (row) => toggleCheck(row.id),
      cellChecked: (row) => isChecked(row.id)
    },

    {
      headerText: 'Social media',
      component: (row) => (
        <Link href={row.link} color="blue.400" isExternal>
          {row.link}
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
      mapValue: (value) => FREQ_CODE[value]
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
  return <Table colConfigs={colConfigs} rows={rows} />;
};

export default TableDemo;
