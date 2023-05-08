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
  },
  checkboxes: {
    paddingRight: "var(--spacing-4)",
  },
  selectNoneBtn: {
    marginLeft: "-1rem",
    marginRight: "-1.25rem",
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
};

const AlertsList = () => {
  const [checkedAll, setCheckedAll] = useState(false);
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
      setCheckedAll(true);
      setChecked(true);
    }
  };

  const selectNoneHandler = () => {
    const checkboxes: any = document.querySelectorAll(".checkboxes");
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
      setCheckedAll(false);
      setChecked(false);
    }
  };

  const checkboxHandler = () => {
    setChecked(true);
  };

  const investigateHandler = () => {
    alert("This feature has not been implemented.");
  };

  const acknowledgeHandler = () => {
    // const accordionItemsToRemove: any[] = [];
    // const accordionItems: any = document.querySelectorAll(
    //   ".accordion-item"
    // );
    // let accordionId = accordionItems.id
    // accordionId = Math.floor(Math.random() * 150)
    // accordionItems.id = accordionId
    // accordionItems.forEach(
    //   (item: any) => {
    //     if (item && (checked || checkedAll)) {
    //       accordionItemsToRemove.push(accordionId);
    //     }
    //   }
    // );
    // accordionItemsToRemove.forEach((id) => {
    //   const accordionIdToRemove = document.getElementById(id);
    //   console.log(accordionId, "id")
    //   accordionIdToRemove?.remove();
    // });
  };

  return (
    <div>
      <RuxTable>
        <RuxTableHeader>
          <RuxTableHeaderRow>
            <RuxTableHeaderCell>
              {checkedAll !== true ? (
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
                <RuxAccordionItem className="accordion-item">
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
                        onClick={checkboxHandler}
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
      <div style={styles.footer}>
        {checkedAll || checked ? (
          <div>
            <RuxButton
              style={{ marginRight: "1rem" }}
              onClick={acknowledgeHandler}
            >
              Acknowledge
            </RuxButton>
            <RuxButton onClick={acknowledgeHandler}>Dismiss</RuxButton>
          </div>
        ) : (
          <div>
            <RuxButton disabled style={{ marginRight: "1rem" }}>
              Acknowledge
            </RuxButton>
            <RuxButton disabled>Dismiss</RuxButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsList;
