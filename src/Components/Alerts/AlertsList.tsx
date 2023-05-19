/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from "react";
import {
  RuxTable,
  RuxTableHeader,
  RuxTableHeaderRow,
  RuxTableHeaderCell,
  RuxTableBody,
  RuxCheckbox,
  RuxButton,
} from "@astrouxds/react";
import AlertListItem from "./AlertListItem";
import useAlerts from "../../hooks/useAlerts";
import { Category, Status } from "../../Types";

const styles = {
  selectAllCheckbox: {
    marginLeft: "1.25rem",
    marginRight: "2.5rem",
  }
};

type PropTypes = {
  severitySelection: Status | "all";
  categorySelection: Category | "all";
};

const AlertsList = ({ severitySelection, categorySelection }: PropTypes) => {
  const {
    alerts,
    initialize,
    deleteSelectedAlerts,
    selectAll,
    selectNone,
    stopGenerating,
    generate,
    allSelected,
    anySelected,
  } = useAlerts();

  useEffect(() => {
    initialize();
    generate();

    return () => {
      stopGenerating();
    };
  }, []);

  const filterAlerts = (
    severity: Status | "all",
    category: Category | "all"
  ) => {
    const alertsArray = Object.values(alerts);
    const filteredForSeverityAlerts =
      severity !== "all"
        ? alertsArray.filter((alert) => alert.status === severity)
        : alertsArray;
    const filteredForCategoryAlerts =
      category !== "all"
        ? filteredForSeverityAlerts.filter(
            (alert) => alert.category === category
          )
        : filteredForSeverityAlerts;
    return filteredForCategoryAlerts;
  };

  const filteredAlertIds = useMemo(() => {
    return filterAlerts(severitySelection, categorySelection).map(
      (alert) => alert.id
    );
  }, [severitySelection, categorySelection, alerts]);

  const selectAllHandler = (e: CustomEvent) => {
    const checkbox = e.target as HTMLRuxCheckboxElement;
    if (checkbox.checked === true) {
      selectAll();
    } else {
      selectNone();
    }
  };

  return (
    <>
    <div className="table-wrapper">
      <RuxTable>
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
      </RuxTable>
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
