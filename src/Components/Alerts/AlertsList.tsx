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
  RuxAccordionItem
} from "@astrouxds/react";
import "./AlertsList.css"

const styles = {
  investigateBtn: {
    display: "flex", justifyContent: "center", paddingBlock: ".5rem"
  }, 
  accordianLabel: {
    color: "white", 
    width: "458px"
  }
}


const AlertsList = () => {

    const selectAllHandler = (event: any) => {
        const checkboxes = event.target.querySelectorAll('.rux-checkbox')
        for (let i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = true
            }
    }

  return (
    <RuxTable>
      <RuxTableHeader>
        <RuxTableHeaderRow>
          <RuxTableHeaderCell style={{justifyContent: "space-between"}}>
            <RuxButton borderless size="small" onClick={selectAllHandler}>Select All</RuxButton> Message Category Time
          </RuxTableHeaderCell>
          {/* <RuxTableHeaderCell></RuxTableHeaderCell>
          <RuxTableHeaderCell>Message</RuxTableHeaderCell>
          <RuxTableHeaderCell>Category</RuxTableHeaderCell>
        <RuxTableHeaderCell>Time</RuxTableHeaderCell> */}
  
        </RuxTableHeaderRow>
      </RuxTableHeader>
      <RuxTableBody>


      <RuxAccordion>
        <RuxTableRow>
       <RuxAccordionItem>Red FEP 124 is degraded at 15:59:57. <br/> <RuxButton style={styles.investigateBtn} >Investigate</RuxButton>
          <div slot="label" style={styles.accordianLabel}>
        <RuxTableCell style={{textAlign: "center"}}>
            <RuxCheckbox checked/>
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
       
          <RuxAccordion >
        <RuxTableRow>
       <RuxAccordionItem >Red FEP 124 is degraded at 15:59:57. <RuxButton style={styles.investigateBtn}>Investigate</RuxButton>
          <div slot="label" style={styles.accordianLabel}>
        <RuxTableCell style={{textAlign: "center"}}>
            <RuxCheckbox checked/>
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
       <RuxAccordionItem>Red FEP 124 is degraded at 15:59:57. <RuxButton style={styles.investigateBtn}>Investigate</RuxButton>
          <div slot="label" style={styles.accordianLabel}>
        <RuxTableCell style={{textAlign: "center"}}>
            <RuxCheckbox checked/>
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
