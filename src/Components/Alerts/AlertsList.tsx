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
import { useState } from "react";

const styles = {
  investigateBtn: {
    display: "flex",
    justifyContent: "center",
    paddingBlock: ".5rem",
  },
  accordianLabel: {
    color: "white",
    width: "458px",
  },
};

const alertsDataItem = {
  status: "caution" as const,
  Message: "Antenna VTS 1 - NOLOCK",
  Category: "Software",
  Time: "15:59:57",
};

const fixtureData = Array(6).fill(alertsDataItem);

const AlertsList = () => {
  const [checked, setChecked] = useState(false);

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
                style={{ marginLeft: "-1rem" }}
                borderless
                size="small"
                onClick={selectNoneHandler}
              >
                Select None
              </RuxButton>
            )}
            Message <span style={{ marginLeft: "7rem" }}>Category</span>
            <span style={{ marginLeft: "1rem" }}>Time</span>
           </RuxTableHeaderCell>
          {/* {Object.keys(fixtureData[0]).map((key) => (
            <RuxTableHeaderCell style={{ textAlign: "right" }}>
              {key === "status" ? "" : key}
            </RuxTableHeaderCell>
          ))} */}
        </RuxTableHeaderRow>
      </RuxTableHeader>
      <RuxTableBody>
        {fixtureData.map((dataObj: rowDataObject) => (
          <RuxAccordion>
            <RuxTableRow>
              <RuxAccordionItem>
                Red FEP 124 is degraded at 15:59:57. <br />
                <RuxButton onClick={investigateHandler} style={styles.investigateBtn}>Investigate</RuxButton>
                <div slot="label" style={styles.accordianLabel}>
                  <RuxTableCell style={{ textAlign: "center" }}>
                    <RuxCheckbox className="checkboxes"/>
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
