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
        </RuxTableHeaderRow>
      </RuxTableHeader>

      <RuxTableBody>
        <RuxAccordion>
          <RuxTableRow>
            <RuxAccordionItem>
              Red FEP 124 is degraded at 15:59:57. <br />
              <RuxButton
                style={styles.investigateBtn}
                onClick={investigateHandler}
              >
                Investigate
              </RuxButton>
              <div slot="label" style={styles.accordianLabel}>
                <RuxTableCell style={{ textAlign: "center" }}>
                  <RuxCheckbox className="checkboxes" />
                </RuxTableCell>
                <RuxTableCell>
                  <RuxStatus status="caution" />
                </RuxTableCell>
                <RuxTableCell>Black FEP 201 - Degraded</RuxTableCell>
                <RuxTableCell>Software</RuxTableCell>
                <RuxTableCell>15:59:57</RuxTableCell>
              </div>
            </RuxAccordionItem>
          </RuxTableRow>
        </RuxAccordion>

        <RuxAccordion>
          <RuxTableRow>
            <RuxAccordionItem>
              Red FEP 124 is degraded at 15:59:57.
              <RuxButton
                style={styles.investigateBtn}
                onClick={investigateHandler}
              >
                Investigate
              </RuxButton>
              <div slot="label" style={styles.accordianLabel}>
                <RuxTableCell style={{ textAlign: "center" }}>
                  <RuxCheckbox className="checkboxes" />
                </RuxTableCell>
                <RuxTableCell>
                  <RuxStatus status="critical" />
                </RuxTableCell>
                <RuxTableCell>Black FEP 201 - Degraded</RuxTableCell>
                <RuxTableCell>Software</RuxTableCell>
                <RuxTableCell>15:59:57</RuxTableCell>
              </div>
            </RuxAccordionItem>
          </RuxTableRow>
        </RuxAccordion>

        <RuxAccordion>
          <RuxTableRow>
            <RuxAccordionItem>
              Red FEP 124 is degraded at 15:59:57.
              <RuxButton
                style={styles.investigateBtn}
                onClick={investigateHandler}
              >
                Investigate
              </RuxButton>
              <div slot="label" style={styles.accordianLabel}>
                <RuxTableCell style={{ textAlign: "center" }}>
                  <RuxCheckbox className="checkboxes" />
                </RuxTableCell>
                <RuxTableCell>
                  <RuxStatus status="normal" />
                </RuxTableCell>
                <RuxTableCell>Black FEP 201 - Degraded</RuxTableCell>
                <RuxTableCell>Software</RuxTableCell>
                <RuxTableCell>15:59:57</RuxTableCell>
              </div>
            </RuxAccordionItem>
          </RuxTableRow>
        </RuxAccordion>
        <RuxAccordion>
          <RuxTableRow>
            <RuxAccordionItem>
              Red FEP 124 is degraded at 15:59:57. <br />
              <RuxButton
                style={styles.investigateBtn}
                onClick={investigateHandler}
              >
                Investigate
              </RuxButton>
              <div slot="label" style={styles.accordianLabel}>
                <RuxTableCell style={{ textAlign: "center" }}>
                  <RuxCheckbox className="checkboxes" />
                </RuxTableCell>
                <RuxTableCell>
                  <RuxStatus status="caution" />
                </RuxTableCell>
                <RuxTableCell>Black FEP 201 - Degraded</RuxTableCell>
                <RuxTableCell>Software</RuxTableCell>
                <RuxTableCell>15:59:57</RuxTableCell>
              </div>
            </RuxAccordionItem>
          </RuxTableRow>
        </RuxAccordion>

        <RuxAccordion>
          <RuxTableRow>
            <RuxAccordionItem>
              Red FEP 124 is degraded at 15:59:57.
              <RuxButton
                style={styles.investigateBtn}
                onClick={investigateHandler}
              >
                Investigate
              </RuxButton>
              <div slot="label" style={styles.accordianLabel}>
                <RuxTableCell style={{ textAlign: "center" }}>
                  <RuxCheckbox className="checkboxes" />
                </RuxTableCell>
                <RuxTableCell>
                  <RuxStatus status="serious" />
                </RuxTableCell>
                <RuxTableCell>Black FEP 201 - Degraded</RuxTableCell>
                <RuxTableCell>Software</RuxTableCell>
                <RuxTableCell>15:59:57</RuxTableCell>
              </div>
            </RuxAccordionItem>
          </RuxTableRow>
        </RuxAccordion>

        <RuxAccordion>
          <RuxTableRow>
            <RuxAccordionItem>
              Red FEP 124 is degraded at 15:59:57.
              <RuxButton
                style={styles.investigateBtn}
                onClick={investigateHandler}
              >
                Investigate
              </RuxButton>
              <div slot="label" style={styles.accordianLabel}>
                <RuxTableCell style={{ textAlign: "center" }}>
                  <RuxCheckbox className="checkboxes" />
                </RuxTableCell>
                <RuxTableCell>
                  <RuxStatus status="normal" />
                </RuxTableCell>
                <RuxTableCell>Black FEP 201 - Degraded</RuxTableCell>
                <RuxTableCell>Software</RuxTableCell>
                <RuxTableCell>15:59:57</RuxTableCell>
              </div>
            </RuxAccordionItem>
          </RuxTableRow>
        </RuxAccordion>
        <RuxAccordion>
          <RuxTableRow>
            <RuxAccordionItem>
              Red FEP 124 is degraded at 15:59:57. <br />
              <RuxButton
                style={styles.investigateBtn}
                onClick={investigateHandler}
              >
                Investigate
              </RuxButton>
              <div slot="label" style={styles.accordianLabel}>
                <RuxTableCell style={{ textAlign: "center" }}>
                  <RuxCheckbox className="checkboxes" />
                </RuxTableCell>
                <RuxTableCell>
                  <RuxStatus status="critical" />
                </RuxTableCell>
                <RuxTableCell>Black FEP 201 - Degraded</RuxTableCell>
                <RuxTableCell>Software</RuxTableCell>
                <RuxTableCell>15:59:57</RuxTableCell>
              </div>
            </RuxAccordionItem>
          </RuxTableRow>
        </RuxAccordion>

        <RuxAccordion>
          <RuxTableRow>
            <RuxAccordionItem>
              Red FEP 124 is degraded at 15:59:57.
              <RuxButton
                style={styles.investigateBtn}
                onClick={investigateHandler}
              >
                Investigate
              </RuxButton>
              <div slot="label" style={styles.accordianLabel}>
                <RuxTableCell style={{ textAlign: "center" }}>
                  <RuxCheckbox className="checkboxes" />
                </RuxTableCell>
                <RuxTableCell>
                  <RuxStatus status="serious" />
                </RuxTableCell>
                <RuxTableCell>Black FEP 201 - Degraded</RuxTableCell>
                <RuxTableCell>Software</RuxTableCell>
                <RuxTableCell>15:59:57</RuxTableCell>
              </div>
            </RuxAccordionItem>
          </RuxTableRow>
        </RuxAccordion>

        <RuxAccordion>
          <RuxTableRow>
            <RuxAccordionItem>
              Red FEP 124 is degraded at 15:59:57.
              <RuxButton
                style={styles.investigateBtn}
                onClick={investigateHandler}
              >
                Investigate
              </RuxButton>
              <div slot="label" style={styles.accordianLabel}>
                <RuxTableCell style={{ textAlign: "center" }}>
                  <RuxCheckbox className="checkboxes" />
                </RuxTableCell>
                <RuxTableCell>
                  <RuxStatus status="normal" />
                </RuxTableCell>
                <RuxTableCell>Black FEP 201 - Degraded</RuxTableCell>
                <RuxTableCell>Software</RuxTableCell>
                <RuxTableCell>15:59:57</RuxTableCell>
              </div>
            </RuxAccordionItem>
          </RuxTableRow>
        </RuxAccordion>
        <RuxAccordion>
          <RuxTableRow>
            <RuxAccordionItem>
              Red FEP 124 is degraded at 15:59:57. <br />
              <RuxButton
                style={styles.investigateBtn}
                onClick={investigateHandler}
              >
                Investigate
              </RuxButton>
              <div slot="label" style={styles.accordianLabel}>
                <RuxTableCell style={{ textAlign: "center" }}>
                  <RuxCheckbox className="checkboxes" />
                </RuxTableCell>
                <RuxTableCell>
                  <RuxStatus status="caution" />
                </RuxTableCell>
                <RuxTableCell>Black FEP 201 - Degraded</RuxTableCell>
                <RuxTableCell>Software</RuxTableCell>
                <RuxTableCell>15:59:57</RuxTableCell>
              </div>
            </RuxAccordionItem>
          </RuxTableRow>
        </RuxAccordion>

        <RuxAccordion>
          <RuxTableRow>
            <RuxAccordionItem>
              Red FEP 124 is degraded at 15:59:57.
              <RuxButton
                style={styles.investigateBtn}
                onClick={investigateHandler}
              >
                Investigate
              </RuxButton>
              <div slot="label" style={styles.accordianLabel}>
                <RuxTableCell style={{ textAlign: "center" }}>
                  <RuxCheckbox className="checkboxes" />
                </RuxTableCell>
                <RuxTableCell>
                  <RuxStatus status="serious" />
                </RuxTableCell>
                <RuxTableCell>Black FEP 201 - Degraded</RuxTableCell>
                <RuxTableCell>Software</RuxTableCell>
                <RuxTableCell>15:59:57</RuxTableCell>
              </div>
            </RuxAccordionItem>
          </RuxTableRow>
        </RuxAccordion>

        <RuxAccordion>
          <RuxTableRow>
            <RuxAccordionItem>
              Red FEP 124 is degraded at 15:59:57.
              <RuxButton
                style={styles.investigateBtn}
                onClick={investigateHandler}
              >
                Investigate
              </RuxButton>
              <div slot="label" style={styles.accordianLabel}>
                <RuxTableCell style={{ textAlign: "center" }}>
                  <RuxCheckbox className="checkboxes" />
                </RuxTableCell>
                <RuxTableCell>
                  <RuxStatus status="normal" />
                </RuxTableCell>
                <RuxTableCell>Black FEP 201 - Degraded</RuxTableCell>
                <RuxTableCell>Software</RuxTableCell>
                <RuxTableCell>15:59:57</RuxTableCell>
              </div>
            </RuxAccordionItem>
          </RuxTableRow>
        </RuxAccordion>
      </RuxTableBody>
    </RuxTable>
  );
};

export default AlertsList;
