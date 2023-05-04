import { useState } from "react";
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
import type { rowDataObject } from "../../Types/types";

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

  const alertsDataItem = {
    status: "caution" as const,
    Message: "Antenna VTS 1 - NOLOCK",
    Category: "Software",
    Time: "15:59:57",
  };

  const fixtureData = Array(15).fill(alertsDataItem);

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
        {fixtureData.map((dataObj: rowDataObject) => (
          <RuxAccordion>
            <RuxTableRow>
              <RuxAccordionItem>
                Red FEP 124 is degraded at 15:59:57. <br />
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
                  {Object.entries(dataObj).map(([key, value]) =>
                    key === "status" ? (
                      <RuxTableCell>
                        <RuxStatus status={dataObj.status} />
                      </RuxTableCell>
                    ) : (
                      <RuxTableCell style={{ textAlign: "right" }}>
                        {value}
                      </RuxTableCell>
                    )
                  )}
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
