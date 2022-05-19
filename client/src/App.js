import React, { useState, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import debounce from 'lodash.debounce';
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import { columnDefs, defaultColDef } from "./columns";
import GridComponents from "./Components";

import "./App.css";

function App() {
  const [gridApi, setGridApi] = useState(null);
  const [columnApi, setColumnApi] = useState(null);

  const [rowData, setRowData] = useState(null);

  const frameworkComponents = {
    simpleEditor: GridComponents.SimpleEditor,
    actionsRenderer: GridComponents.ActionsRenderer,
    addRowStatusBar: GridComponents.AddRowStatusBar
  };

  function onGridReady(params) {
    setGridApi(params.api);
    setColumnApi(params.columnApi);
    fetch("/terms"
    )
      .then(res => res.json())
      .then(data => {
        data.forEach(row => (row.id = row._id));
        setRowData(data);
      });
    params.api.sizeColumnsToFit();
  }

  const reloadData = () => {
    fetch("/terms"
    )
      .then(res => res.json())
      .then(data => {
        data.forEach(row => (row.id = row._id));
        setRowData(data);
      })

  }

  const onCellValueRemoved = useCallback((event) => {
    console.log('Data after change is', event.data);
    fetch(`/terms/${event.data.id}`, {
      method: 'DELETE',
      body: JSON.stringify({ definition: event.data.definition, term: event.data.term }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => reloadData())
  }, []);

  const onCellValueChanged = (event) => {
    console.log('Data after change is', event.data);
    if (rowData.filter(i => i._id === event.data.id).length === 0) {
      fetch(`/terms/`, {
        method: 'POST',
        body: JSON.stringify({ definition: event.data.definition, term: event.data.term }),

        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => reloadData())
    }
    else {
      fetch(`/terms/${event.data.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ definition: event.data.definition, term: event.data.term }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => reloadData())
    }
  };

  const debouncedCellValueChanged = debounce((event) => onCellValueChanged(event), 1000);

  return (
    <div className="my-app">
      <h1>Glossary Term Data Model</h1>
      <div
        id="myGrid"
        style={{ height: "80vh", width: "100%" }}
        className="ag-theme-alpine"
      >
        <AgGridReact
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowData={rowData}
          getRowNodeId={data => data.id}
          onGridReady={onGridReady}
          frameworkComponents={frameworkComponents}
          editType="fullRow"
          suppressClickEdit
          onCellValueChanged={debouncedCellValueChanged}
          // onVirtualRowRemoved={onCellValueRemoved}
          statusBar={{
            statusPanels: [{ statusPanel: "addRowStatusBar" }]
          }}
        />
      </div>
    </div>
  );
}

export default App;
