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
    wordWrap: "break-word" as "break-word",
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
  },
  alertCategory: {
    width: "4.75rem",
    alignSelf: "center",
    paddingLeft: "1.5rem",
  },
  alertTime: {
    width: "1.75rem",
    paddingLeft: ".7rem",
    alignSelf: "left",
  },
  firstAccordionItem: {
    backgroundColor: "#141f2c", 
    color: "red"
  }
};

const AlertsList = () => {
  const [checkedAll, setCheckedAll] = useState(false);
  const [checked, setChecked] = useState(false);
  const { alerts, alertIds, generate, stopGenerating, initialize } =
    useAlerts();

    // console.log(alerts)

  const selectAllHandler = () => {
    const selectAllCheckbox: any = document.querySelector(
      ".select-all-checkbox"
    );
    const checkboxes: any = document.querySelectorAll(".checkboxes");
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = true;
      setCheckedAll(true);
      setChecked(true);

      if (selectAllCheckbox.checked !== false) {
        checkboxes[i].checked = false;
        setCheckedAll(false);
        setChecked(false);
      }
    }
  };

  const checkboxHandler = () => {
    setChecked(true);
    const checkboxes: any = document.querySelectorAll(".checkboxes");
    checkboxes.forEach((checkbox: any) => {
      //check if any of the checkboxes are checked ( || checkboxes.checked.length)?
      if (checkbox.checked) {
        setChecked(false);
      }
    });
  };

  const investigateHandler = () => {
    alert("This feature has not been implemented.");
  };

  const accordionItem: any = document.querySelectorAll(".accordion-item")

   if(accordionItem && accordionItem[0] !== (null || "undefined")) {
    // accordionItem[0].style.color = "red"
    console.log(accordionItem[0])
    // Object.assign(accordionItem?.style, styles.firstAccordionItem)
   }


  const acknowledgeHandler = () => {
    const accordionItem: any = document.querySelectorAll(".accordion-item");
    const accordionItemsToRemove: any[] = [];
    

    // accordionItem.forEach((item: any) => {
    //   const alertId = item.dataset.id;

      if (alerts.id && (checked || checkedAll)) {
        accordionItemsToRemove.push(alerts.id);
      }
    // });
    accordionItemsToRemove.forEach((id) => {
      const alertItem = document.getElementById(id);
      console.log(alertItem, "item")
      alertItem?.remove();
    });
  };

  useEffect(() => {
    initialize();
    generate();

    return () => {
      stopGenerating();
    };
  }, []);

  return (
    <div>
      <RuxTable>
        <RuxTableHeader>
          <RuxTableHeaderRow>
            <RuxTableHeaderCell>
              <RuxCheckbox
                style={styles.selectAllCheckbox}
                onClick={selectAllHandler}
                className="select-all-checkbox"
              ></RuxCheckbox>
              <span style={{ marginLeft: "var(--spacing-4)" }}> Message</span>
              <span style={{ marginLeft: "6.25rem" }}>Category</span>
              <span style={{ marginLeft: "var(--spacing-6)" }}>Time</span>
            </RuxTableHeaderCell>
          </RuxTableHeaderRow>
        </RuxTableHeader>
        <RuxTableBody>
          {alertIds.map((alertId) => (
            <RuxAccordion>
              <RuxAccordionItem className="accordion-item">
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
