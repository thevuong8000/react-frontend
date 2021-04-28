Schema for `colConfigs`
```js
interface ActionButton {
  onClick: (row_data, index) => undefined,
  show: boolean | (row_data) => boolean,
  title: string,
  disabled: boolean | (row_data) => boolean,
  colorScheme: string,
  variant: string,
  text: string
}

interface HeaderCheckbox {
  onClick: (event) => undefined,
  checked: boolean
}

var colConfigs: [
  {
    headerType: TABLE_CELL_TYPE,
    headerCheckbox: HeaderCheckbox,
    headerText: string,
    onHeaderClick: (event) => undefined,
    headerStyle: object,
    headerProps: object,

    cellType: TABLE_CELL_TYPE,
    onCellClick: void,
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
