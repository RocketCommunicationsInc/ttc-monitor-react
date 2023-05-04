import { useEffect, useState } from "react";
import {
  RuxTable,
  RuxTableHeader,
  RuxTableHeaderRow,
  RuxTableHeaderCell,
  RuxTableRow,
  RuxTableCell,
  RuxTableBody,
  RuxCheckbox,
  RuxStatus,
  RuxButton,
  RuxAccordion,
  RuxAccordionItem,
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
    width: "28.625rem",
  },
  checkboxes: {
    paddingRight: "var(--spacing-4)",
  },
  selectNoneBtn: {
    marginLeft: "-1rem",
    marginRight: "-1.25rem",
  },
};

const AlertsList = () => {
  const [checked, setChecked] = useState(false);
  const { alerts, alertIds, generate, stopGenerating, initialize } =
    useAlerts();

  const selectAllHandler = () => {
    const checkboxes: any = document.querySelectorAll(".checkboxes");
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = true;
      setChecked(true);
    }
  };

  const selectNoneHandler = () => {
    const checkboxes: any = document.querySelectorAll(".checkboxes");
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
      setChecked(false);
    }
  };

  const investigateHandler = () => {
    alert("This feature has not been implemented.");
  };

  useEffect(() => {
    initialize();
    generate();

    return () => {
      stopGenerating();
    };
  }, []);

  return (
    <RuxTable>
      <RuxTableHeader>
        <RuxTableHeaderRow>
          <RuxTableHeaderCell>
            {checked !== true ? (
              <RuxButton
                style={{ marginLeft: "-1rem" }}
                borderless
                size="small"
                onClick={selectAllHandler}
              >
                Select All
              </RuxButton>
            ) : (
              <RuxButton
                style={styles.selectNoneBtn}
                borderless
                size="small"
                onClick={selectNoneHandler}
              >
                Select None
              </RuxButton>
            )}
            <span style={{ marginLeft: "var(--spacing-4)" }}> Message</span>
            <span style={{ marginLeft: "7.65rem" }}>Category</span>
            <span style={{ marginLeft: "var(--spacing-4)" }}>Time</span>
          </RuxTableHeaderCell>
        </RuxTableHeaderRow>
      </RuxTableHeader>
      <RuxTableBody>
        {alertIds.map((alertId) => (
          <RuxAccordion key={alertId}>
            <RuxTableRow>
              <RuxAccordionItem>
                {alerts[alertId].message} <br />
                <RuxButton
                  onClick={investigateHandler}
                  style={styles.investigateBtn}
                >
                  Investigate
                </RuxButton>
                <div slot="label" style={styles.accordianLabel}>
                  <RuxTableCell style={{ textAlign: "center" }}>
                    <RuxCheckbox
                      style={styles.checkboxes}
                      className="checkboxes"
                    />
                  </RuxTableCell>
                  <RuxTableCell>
                    <RuxStatus status={alerts[alertId].status} />
                  </RuxTableCell>
                  <RuxTableCell>{alerts[alertId].message}</RuxTableCell>
                  <RuxTableCell>{alerts[alertId].category}</RuxTableCell>
                  <RuxTableCell>{alerts[alertId].message}</RuxTableCell>
                  <RuxTableCell>
                    {new Date(alerts[alertId].timestamp)
                      .toTimeString()
                      .slice(0, 8)}
                  </RuxTableCell>

                  {/* {Object.entries(alerts[alertId]).map(([key, value]) =>
                    key === "status" ? (
                      <RuxTableCell>
                        <RuxStatus status={alerts[alertId].status} />
                      </RuxTableCell>
                    ) : (
                      <RuxTableCell style={{ textAlign: "right" }}>
                        {value}
                      </RuxTableCell>
                    )
                  )} */}
                </div>
              </RuxAccordionItem>
            </RuxTableRow>
          </RuxAccordion>
        ))}
      </RuxTableBody>
    </RuxTable>
  );
};

export default AlertsList;
