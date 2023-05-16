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

const styles = {
  investigateBtn: {
    display: "flex",
    justifyContent: "center",
    paddingBlock: "var(--spacing-2)",
  },
  accordianLabel: {
    color: "var(--color-palette-neutral-000)",
  },
  checkboxes: {
    paddingRight: "var(--spacing-4)",
  },
  selectAllCheckbox: {
    marginLeft: "1.25rem",
    marginRight: "2.5rem",
  },
  footer: {
    display: "flex",
    justifyContent: "center",
    borderTop: "1px solid var(--logHeaderBackgroundColor, rgb(20, 32, 44))",
    boxShadow: " 0 -0.5rem 1.25rem rgba(0, 0, 0, 0.25)",
    height: "3rem",
    padding: "2rem",
    position: "sticky" as "sticky",
    bottom: 0,
    backgroundColor: "#1B2D3E",
  },
  alertMessage: {
    minWidth: "9rem",
    maxWidth: "9rem",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  alertCategory: {
    width: "4.75rem",
    alignSelf: "center",
    paddingLeft: "1.1rem",
  },
  alertTime: {
    width: "1.7rem",
    paddingLeft: ".6rem",
    alignSelf: "left",
  },
};

type PropTypes = {
  selection: string;
};

const AlertsList = ({ selection }: PropTypes) => {
  const {
    alerts,
    alertIds,
    initialize,
    deleteAlerts,
    selectAll,
    selectNone,
    stopGenerating,
    generate,
  } = useAlerts();

  console.log(alerts);

  const allSelected = useMemo(
    () => Object.values(alerts).every((alert) => alert && alert.selected),
    [alerts]
  );
  const anySelected = useMemo(
    () => !Object.values(alerts).every((alert) => !alert.selected),
    [alerts]
  );

  useEffect(() => {
    initialize();
    generate();

    return () => {
      stopGenerating();
    };
  }, []);

  const alertValue = Object.values(alerts);

  const filteredAlertIds = useMemo(() => {
    const alertIdsArr = [...alertIds];
    if (selection === "all") {
      return alertIds;
    }
    if (selection.includes("critical")) {
      return alertValue
        .filter((alert) => alert.status === "critical")
        .map((alert) => alert.id);
    }
    if (selection.includes("caution")) {
      return alertValue
        .filter((alert) => alert.status === "caution")
        .map((alert) => alert.id);
    }
    if (selection.includes("serious")) {
      return alertValue
        .filter((alert) => alert.status === "serious")
        .map((alert) => alert.id);
    }
    if (selection.includes("hardware")) {
      return alertValue
        .filter((alert) => alert.category === "hardware")
        .map((alert) => alert.id);
    }
    if (selection.includes("software")) {
      return alertValue
        .filter((alert) => alert.category === "software")
        .map((alert) => alert.id);
    }
    if (selection.includes("spacecraft")) {
      return alertValue
        .filter((alert) => alert.category === "spacecraft")
        .map((alert) => alert.id);
    }
    return alertIdsArr;
  }, [selection, alertValue]);

  const selectAllCheckbox: HTMLInputElement = document.querySelector(
    ".select-all-checkbox"
  ) as HTMLInputElement;

  const acknowledgeHandler = () => {
    const alertsToRemove: string[] = [];
    alertIds.forEach((id) => {
      if (alerts[id].selected === true) {
        alertsToRemove.push(id);
      }
    });
    deleteAlerts(alertsToRemove);
    if (selectAllCheckbox.checked !== false) {
      selectAllCheckbox.checked = false;
    }
  };

  const selectAllHandler = () => {
    if (selectAllCheckbox.checked === true) {
      selectAll();
    } else {
      selectNone();
    }
  };

  return (
    <div>
      <RuxTable style={{ height: "36.5rem" }}>
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
            <AlertListItem alertItem={alerts[alertId]} />
          ))}
        </RuxTableBody>
      </RuxTable>
      <div style={styles.footer}>
        <div>
          <RuxButton
            secondary
            onClick={acknowledgeHandler}
            style={{ marginRight: "1rem" }}
            disabled={!anySelected}
          >
            Dismiss
          </RuxButton>
          <RuxButton onClick={acknowledgeHandler} disabled={!anySelected}>
            Acknowledge
          </RuxButton>
        </div>
      </div>
    </div>
  );
};

export default AlertsList;
