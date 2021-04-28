Schema for `colConfigs`
```
ActionButton: {
  show: boolean | (row_data) => boolean,
  onClick: function,
  title: string,
  disabled: boolean | (row_data) => boolean,
  colorScheme: string,
  variant: string,
  text: string
}

HeaderCheckbox: {
  onClick: function,
  checked: boolean
}

colConfigs: [
  {
    headerType: TABLE_CELL_TYPE,
    headerCheckbox: HeaderCheckbox,
    headerText: string,
    onHeaderClick: function,
    headerStyle: object,
    headerProps: object,

    cellType: TABLE_CELL_TYPE,
    onCellClick: function,
    cellChecked: (row_data, index) => boolean,
    cellProp: string,
    cellStyle: object,

    component: React.Component
    disabled: (row_data, index) => boolean,

    message: (row_data) => string,
    mapValue: (value, row_data, index) => React.Component | string,

    buttons: array<ActionButton>,

    startIndex: number
  }
]
```
