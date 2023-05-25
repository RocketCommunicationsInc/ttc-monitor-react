/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from "react";
import { RuxCheckbox, RuxButton } from "@astrouxds/react";
import AlertListItem from "./AlertListItem";
import useAlerts from "../../hooks/useAlerts";
import { Category, Status } from "../../Types";

const styles = {
  selectAllCheckbox: {
    marginLeft: "1.25rem",
    marginRight: "3.25rem",
  },
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
      <div className="alert-list-headers">
        <RuxCheckbox
          style={styles.selectAllCheckbox}
          onRuxchange={selectAllHandler}
          checked={allSelected}
          indeterminate={anySelected && !allSelected}
        />
        <span className="message-column">Message</span>
        <span className="category-time-column">
          <span className="alert-category">Category</span>
          <span className="alert-time">Time</span>
        </span>
      </div>
      <div className="table-wrapper alert-list" id="alert-scrollbar">
        <ul>
          {filteredAlertIds.map((alertId) => (
            <AlertListItem alertItem={alerts[alertId]} key={alertId} />
          ))}
        </ul>
      </div>
      <div className="alerts-footer" slot="footer">
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
