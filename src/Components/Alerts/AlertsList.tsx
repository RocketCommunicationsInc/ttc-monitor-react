/* eslint-disable @typescript-eslint/no-unused-expressions */
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
import "./AlertsList.css";
import type { rowDataObject } from "../../Types/types";

const styles = {
  investigateBtn: {
    display: "flex",
    justifyContent: "center",
    paddingBlock: ".5rem",
  },
  accordianLabel: {
    color: "white",
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
  // const selectAllHandler = (event: any) => {
  //   const checkboxes = event.target.querySelectorAll(".rux-checkbox");
  //   for (let i = 0; i < checkboxes.length; i++) {
  //     checkboxes[i]. = true;
  //   }
  // };

  return (
    <RuxTable>
      <RuxTableHeader>
        <RuxTableHeaderRow>
          <RuxTableHeaderCell>
            <RuxButton borderless size="small">
              Select All
            </RuxButton>
          </RuxTableHeaderCell>
          {Object.keys(fixtureData[0]).map((key) => (
            <RuxTableHeaderCell style={{ textAlign: "right" }}>
              {key}
            </RuxTableHeaderCell>
          ))}
        </RuxTableHeaderRow>
      </RuxTableHeader>
      <RuxTableBody>
        {fixtureData.map((dataObj: rowDataObject) => (
          <RuxAccordion>
            <RuxTableRow>
              <RuxAccordionItem>
                Red FEP 124 is degraded at 15:59:57. <br />
                <RuxButton style={styles.investigateBtn}>Investigate</RuxButton>
                <div slot="label" style={styles.accordianLabel}>
                  <RuxTableCell style={{ textAlign: "center" }}>
                    <RuxCheckbox />
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
