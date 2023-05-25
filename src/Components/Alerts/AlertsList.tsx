/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useRef, useCallback, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  RuxTable,
  RuxTableHeader,
  RuxTableHeaderRow,
  RuxTableHeaderCell,
  RuxTableBody,
  RuxCheckbox,
  RuxButton,
  RuxStatus,
} from "@astrouxds/react";
import AlertListItem from "./AlertListItem";
import useAlerts from "../../hooks/useAlerts";
import type { Category, Status, Alert } from "../../Types";
import type {
  RowClickedEvent,
  ColGroupDef,
  ColDef,
  ColDefUtil,
  ValueFormatterParams,
  CheckboxSelectionCallbackParams,
  GridOptions,
  ICellRendererParams,
  //IDetailCellRendererParams,
  RowDataUpdatedEvent,
  FirstDataRenderedEvent,
  CellClickedEvent,
} from "ag-grid-community";

// const styles = {
//   selectAllCheckbox: {
//     marginLeft: "1.25rem",
//     marginRight: "2.5rem",
//   },
// };

type PropTypes = {
  severitySelection: Status | "all";
  categorySelection: Category | "all";
};

const AlertsList = ({ severitySelection, categorySelection }: PropTypes) => {
  const gridRef = useRef<AgGridReact<Alert> | null>(null);
  const {
    alerts,
    initialize,
    deleteSelectedAlerts,
    selectAll,
    selectNone,
    stopGenerating,
    generate,
    toggleSelected,
    allSelected,
    anySelected,
  } = useAlerts();

  const [openBanner, setOpenBanner] = useState(false);

  useEffect(() => {
    initialize();
    // generate();

    return () => {
      stopGenerating();
    };
  }, []);

  useEffect(() => {
    console.log("alerts updated", alerts);
  }, [alerts]);

  const filterAlerts = useMemo(() => {
    const alertsArray = Object.values(alerts);
    const filteredForSeverityAlerts =
      severitySelection !== "all"
        ? alertsArray.filter((alert) => alert.status === severitySelection)
        : alertsArray;
    const filteredForCategoryAlerts =
      categorySelection !== "all"
        ? filteredForSeverityAlerts.filter(
            (alert) => alert.category === categorySelection
          )
        : filteredForSeverityAlerts;
    return filteredForCategoryAlerts;
  }, [severitySelection, categorySelection, alerts]);

  // const filterAlerts = (
  //   severity: Status | "all",
  //   category: Category | "all"
  // ) => {
  //   const alertsArray = Object.values(alerts);
  //   const filteredForSeverityAlerts =
  //     severity !== "all"
  //       ? alertsArray.filter((alert) => alert.status === severity)
  //       : alertsArray;
  //   const filteredForCategoryAlerts =
  //     category !== "all"
  //       ? filteredForSeverityAlerts.filter(
  //           (alert) => alert.category === category
  //         )
  //       : filteredForSeverityAlerts;
  //   return filteredForCategoryAlerts;
  // };

  // const filteredAlertIds = useMemo(() => {
  //   return filterAlerts(severitySelection, categorySelection).map(
  //     (alert) => alert.id
  //   );
  // }, [severitySelection, categorySelection, alerts]);

  const selectAllHandler = (e: CustomEvent) => {
    const checkbox = e.target as HTMLRuxCheckboxElement;
    if (checkbox.checked === true) {
      selectAll();
    } else {
      selectNone();
    }
  };

  const checkboxHandler = () => {
    // toggleSelected(alertItem.id);
    // if (alertItem.selected) {
    //   alertItem.selected = false;
    // } else {
    //   alertItem.selected = true;
    // }
  };

  const SelectAllCheckbox = () => (
    <RuxCheckbox
      // style={styles.selectAllCheckbox}
      onRuxchange={selectAllHandler}
      // className="select-all-checkbox"
      checked={allSelected}
    />
  );

  const rowClickedListener = (e: RowClickedEvent<Alert>) => {
    e.node.setExpanded(!e.node.setExpanded);
    console.log("row clicked e", e);
  };

  // const cellClickedListener = (e: CellClickedEvent<Alert>) => {
  //   e.node.setExpanded(!e.node.setExpanded);
  //   console.log("row clicked e", e);
  // };

  const investigateHandler = () => {
    setOpenBanner(true);
  };

  const detailCellRenderer = () => (
    <div>
      <RuxButton icon="launch" onClick={investigateHandler}>
        Investigate
      </RuxButton>
    </div>
  );

  const gridOptions: GridOptions<Alert> = {
    columnDefs: [
      {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        maxWidth: 40,
        // headerComponent: SelectAllCheckbox,
        onCellClicked: (e: CellClickedEvent) => {
          console.log(alerts);
          if (e.data) {
            console.log(e.data);
            console.log(filterAlerts);
            toggleSelected(e.data.id);
          }
          // e.data && toggleSelected(e.data.id);
        },
      },
      {
        field: "",
        cellRenderer: (params: ICellRendererParams<Alert>) =>
          params.data ? (
            <RuxStatus
              status={params.data.status}
              className="alert-status-icon"
            />
          ) : (
            <RuxStatus status="caution" className="alert-status-icon" />
          ),
        width: 15,
      },

      {
        field: "message",
        headerName: "Message",
        flex: 1,
        cellRenderer: "agGroupCellRenderer",
      },
      { field: "category", headerName: "Category", flex: 1 },
      {
        field: "timestamp",
        headerName: "Time",
        flex: 1,
        valueFormatter: (params: ValueFormatterParams<Alert>) => {
          return params.data
            ? new Date(params.data?.timestamp).toTimeString().slice(0, 8)
            : new Date().toTimeString().slice(0, 8);
        },
      },
    ],
    defaultColDef: {
      sortable: true,
    },
    rowMultiSelectWithClick: true,
    animateRows: true,
    rowSelection: "multiple",
    onRowClicked: rowClickedListener,
    //onCellClicked: cellClickedListener,
    masterDetail: true,
    suppressRowClickSelection: true,
    detailCellRenderer: () => {
      return detailCellRenderer;
    },
    // detailCellRendererParams: (params: ICellRendererParams<Alert>) =>
    //   params.data ? (
    //     <div>
    //       {params.data.message}
    //       <RuxButton icon="launch" onClick={investigateHandler}>
    //         Investigate
    //       </RuxButton>
    //     </div>
    //   ) : null,
    onRowDataUpdated: (e: RowDataUpdatedEvent) => {
      console.log("row updated", e);
    },

    // masterDetail: true,
    // detailCellRendererParams: {
    //   detailGridOptions: {
    //     columnDefs: {
    //       field: "message",
    //     },
    //   },
    //   getDetailRowData: params
    // },
  };

  return (
    <>
      <div className="table-wrapper ag-theme-astro">
        <AgGridReact
          rowData={filterAlerts}
          gridOptions={gridOptions}
          ref={gridRef}
          // masterDetail={true}
        />
        {/* <RuxTable>
          <RuxTableHeader>
            <RuxTableHeaderRow>
              <RuxTableHeaderCell>
                <RuxCheckbox
                  style={styles.selectAllCheckbox}
                  onRuxchange={selectAllHandler}
                  className="select-all-checkbox"
                  checked={allSelected}
                />
                <span style={{ marginLeft: "var(--spacing-4)" }}> Message</span>
                <span style={{ marginLeft: "5.8rem" }}>Category</span>
                <span style={{ marginLeft: "var(--spacing-6)" }}>Time</span>
              </RuxTableHeaderCell>
            </RuxTableHeaderRow>
          </RuxTableHeader>
          <RuxTableBody>
            {filteredAlertIds.map((alertId) => (
              <AlertListItem alertItem={alerts[alertId]} key={alertId} />
            ))}
          </RuxTableBody>
        </RuxTable> */}
      </div>
      <div className="alerts-footer">
        <div>
          <RuxButton
            secondary
            onClick={deleteSelectedAlerts}
            style={{ marginRight: "1rem" }}
            disabled={!anySelected}
          >
            Dismiss
          </RuxButton>
          <RuxButton onClick={deleteSelectedAlerts} disabled={!anySelected}>
            Acknowledge
          </RuxButton>
        </div>
      </div>
    </>
  );
};

export default AlertsList;
