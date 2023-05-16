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
  selection1: string;
  selection2: string;
};

const AlertsList = ({ selection1, selection2 }: PropTypes) => {
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

  const alertValue = Object.values(alerts);

  const filteredAlertData = useMemo(() => {
    const filteredAlerts = alertValue.filter((alert) => {
      if (selection1 === "critical" && alert.status !== "critical") {
        return false;
      }
      if (selection1 === "caution" && alert.status !== "caution") {
        return false;
      }
      if (selection1 === "serious" && alert.status !== "serious") {
        return false;
      }
      if (
        (selection2 === "hardware" && alert.category !== "hardware") ||
        (selection2 === "software" && alert.category !== "software") ||
        (selection2 === "spacecraft" && alert.category !== "spacecraft")
      ) {
        return false;
      } else return true;
    });

    return filteredAlerts.map((alert) => alert.id);
  }, [selection1, selection2, alertValue]);

  const selectAllHandler = (e: CustomEvent) => {
    const checkbox = e.target as HTMLRuxCheckboxElement;
    if (checkbox.checked === true) {
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
          {filteredAlertData.map((alertId) => (
            <AlertListItem alertItem={alerts[alertId]} />
          ))}
        </RuxTableBody>
      </RuxTable>
      <div style={styles.footer}>
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
    </div>
  );
};

export default AlertsList;
