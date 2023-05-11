/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  RuxTable,
  RuxTableHeader,
  RuxTableHeaderRow,
  RuxTableHeaderCell,
  RuxTableCell,
  RuxTableBody,
  RuxCheckbox,
  RuxStatus,
  RuxButton,
  RuxAccordion,
  RuxAccordionItem,
  RuxTableRow,
} from "@astrouxds/react";
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
  firstAccordionItem: {
    backgroundColor: "#141f2c",
    color: "red",
  },
};

const AlertsList = () => {
  const [checkedAll, setCheckedAll] = useState(false);
  const [checked, setChecked] = useState(false);

  const {
    alerts,
    alertIds,
    generate,
    stopGenerating,
    initialize,
    deleteAlerts,
    toggleSelected,
  } = useAlerts();

  useEffect(() => {
    initialize();
    generate();

    return () => {
      stopGenerating();
    };
  }, []);

  const investigateHandler = () => {
    alert("This feature has not been implemented.");
  };

  const checkboxHandler = (checkbox: any) => {
    toggleSelected(checkbox.target.id);
    const checkboxes = document.querySelectorAll(".checkboxes");
    checkboxes.forEach((checkbox: any) => {
      if (checkbox.checked) {
        toggleSelected(checkbox.target.id);
      }
      setChecked(true);
    });
  };

  const selectAllCheckbox: HTMLInputElement = document.querySelector(
    ".select-all-checkbox"
  ) as HTMLInputElement;

  const selectAllHandler = () => {
    const alertObj = Object.values(alerts).map((alertObj) => alertObj);
    alertObj.map((alertId: { selected: boolean }) => {
      alertId.selected = true;
      setCheckedAll(true);
      setChecked(true);
      if (selectAllCheckbox.checked !== false) {
        alertId.selected = false;
        setCheckedAll(false);
        setChecked(false);
      }
    });
  };

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

  return (
    <div>
      <RuxTable style={{ height: "36.5rem" }}>
        <RuxTableHeader>
          <RuxTableHeaderRow>
            <RuxTableHeaderCell>
              <RuxCheckbox
                style={styles.selectAllCheckbox}
                onClick={selectAllHandler}
                className="select-all-checkbox"
              ></RuxCheckbox>
              <span style={{ marginLeft: "var(--spacing-4)" }}> Message</span>
              <span style={{ marginLeft: "5.8rem" }}>Category</span>
              <span style={{ marginLeft: "var(--spacing-6)" }}>Time</span>
            </RuxTableHeaderCell>
          </RuxTableHeaderRow>
        </RuxTableHeader>
        <RuxTableBody>
          {alertIds.map((alertId) => (
            <RuxAccordion>
              <RuxAccordionItem
                id={alerts[alertId].id + ""}
                className="accordion-item"
              >
                {alerts[alertId].message} <br />
                <RuxButton
                  onClick={investigateHandler}
                  style={styles.investigateBtn}
                >
                  Investigate
                </RuxButton>
                <div slot="label" style={styles.accordianLabel}>
                  <RuxTableRow>
                    <RuxTableCell style={{ textAlign: "center" }}>
                      <RuxCheckbox
                        id={alerts[alertId].id + ""}
                        style={styles.checkboxes}
                        className="checkboxes"
                        checked={alerts[alertId].selected}
                        onClick={checkboxHandler}
                      />
                    </RuxTableCell>
                    <RuxTableCell>
                      <RuxStatus status={alerts[alertId].status} />
                    </RuxTableCell>
                    <RuxTableCell style={styles.alertMessage}>
                      {alerts[alertId].message}
                    </RuxTableCell>
                    <RuxTableCell style={styles.alertCategory}>
                      {alerts[alertId].category}
                    </RuxTableCell>
                    <RuxTableCell style={styles.alertTime}>
                      {new Date(alerts[alertId].timestamp)
                        .toTimeString()
                        .slice(0, 8)}
                    </RuxTableCell>
                  </RuxTableRow>
                </div>
              </RuxAccordionItem>
            </RuxAccordion>
          ))}
        </RuxTableBody>
      </RuxTable>
      <div style={styles.footer}>
        {checkedAll || checked ? (
          <div>
            <RuxButton
              secondary
              onClick={acknowledgeHandler}
              style={{ marginRight: "1rem" }}
            >
              Dismiss
            </RuxButton>
            <RuxButton onClick={acknowledgeHandler}>Acknowledge</RuxButton>
          </div>
        ) : (
          <div>
            <RuxButton secondary disabled style={{ marginRight: "1rem" }}>
              Dismiss
            </RuxButton>
            <RuxButton disabled>Acknowledge</RuxButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsList;
