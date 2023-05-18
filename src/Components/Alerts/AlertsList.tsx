/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
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
  }
};

const AlertsList = () => {
  const {
    alerts,
    alertIds,
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
          {alertIds.map((alertId) => (
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
