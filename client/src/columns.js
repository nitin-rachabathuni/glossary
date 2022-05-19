export const columnDefs = [
  {
    headerName: "Term",
    field: "term",
    sort: 'asc',
  },
  {
    headerName: "Definition",
    field: "definition",
    minWidth: 520
  },
  {
    headerName: "",
    colId: "actions",
    cellRenderer: "actionsRenderer",
    editable: false,
    filter: false,
    minWidth: 220
  }
];

export const defaultColDef = {
  editable: true,
  resizable: true,
  filter: true,
  floatingFilter: true,
  suppressKeyboardEvent: params => params.editing
};
