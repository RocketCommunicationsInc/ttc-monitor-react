/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useRef, useCallback } from "react";
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
} from "ag-grid-community";

const styles = {
  selectAllCheckbox: {
    marginLeft: "1.25rem",
    marginRight: "2.5rem",
  },
};

type PropTypes = {
  severitySelection: Status | "all";
  categorySelection: Category | "all";
};

const AlertsList = ({ severitySelection, categorySelection }: PropTypes) => {
  const gridRef = useRef<typeof AgGridReact>();
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

  useEffect(() => {
    initialize();
    // generate();

    return () => {
      stopGenerating();
    };
  }, []);

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

  // const statusIcons = filterAlerts.map((status) => {
  //   return <RuxStatus status="caution" />;
  // });

  const SelectAllCheckbox = () => (
    <RuxCheckbox
      // style={styles.selectAllCheckbox}
      onRuxchange={selectAllHandler}
      // className="select-all-checkbox"
      checked={allSelected}
    />
  );

  const rowClickedListener = (e: RowClickedEvent<Alert>) => {
    if (e.data) {
      // e.node.setExpanded(e.node.expanded);
      // toggleSelected(e.data.id);
      // console.log(e.data);
      // console.log(alerts);
      // console.log(filterAlerts);
    }
  };

  // const masterDetail = true;
  const gridOptions: GridOptions<Alert> = {
    columnDefs: [
      {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        maxWidth: 40,
        // headerComponent: SelectAllCheckbox,
      },
      {
        field: "",
        cellRenderer: function () {
          return <RuxStatus status="caution" />;
        },
        width: 10,
      },
      {
        field: "message",
        headerName: "Message",
        // cellRenderer: "agGroupCellRenderer",
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
  };

  // const detailCellRendererParams = {
  //   detailGridOptions: {
  //     columnDefs: { field: "message" },
  //   },
  // };

  return (
    <>
      <div className="table-wrapper ag-theme-astro">
        <AgGridReact
          // detailCellRendererParams={detailCellRendererParams}
          rowData={filterAlerts}
          gridOptions={gridOptions}
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
