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
//   RuxAccordion, 
//   RuxAccordionItem
} from "@astrouxds/react";


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
          <RuxTableHeaderCell style={{width: "15px"}}>
            <RuxButton borderless size="small" onClick={selectAllHandler}>Select All</RuxButton>
          </RuxTableHeaderCell>
          <RuxTableHeaderCell></RuxTableHeaderCell>
          <RuxTableHeaderCell>Message</RuxTableHeaderCell>
          <RuxTableHeaderCell>Category</RuxTableHeaderCell>
          <RuxTableHeaderCell>Time</RuxTableHeaderCell>
        </RuxTableHeaderRow>
      </RuxTableHeader>
      <RuxTableBody>

      <RuxTableRow>
          <RuxTableCell style={{textAlign: "center"}}>
            <RuxCheckbox checked/>
          </RuxTableCell>
    
          <RuxTableCell>
            <RuxStatus status="caution" />
          </RuxTableCell>
          <RuxTableCell>Antenna VTS 1 - NOLOCK</RuxTableCell>
          <RuxTableCell>Software</RuxTableCell>
          <RuxTableCell>15:59:57</RuxTableCell>
          </RuxTableRow>




          {/* <RuxTableRow> */}
          {/* <RuxAccordion> */}
        <RuxTableRow>
        <RuxTableCell style={{textAlign: "center"}}>
            <RuxCheckbox checked/>
          </RuxTableCell>
          <RuxTableCell>
            <RuxStatus status="caution" />
          </RuxTableCell>

          <RuxTableCell>Black FEP 201 - Degraded</RuxTableCell>
          <RuxTableCell>Software</RuxTableCell>
          <RuxTableCell>15:59:57</RuxTableCell>

        {/* <RuxAccordionItem>Red FEP 124 is degraded at 15:59:57. <RuxButton>Investigate</RuxButton>
        </RuxAccordionItem>

         */}
        </RuxTableRow>
        {/* </RuxAccordion> */}
        {/* </RuxTableRow> */}





        <RuxTableRow>
        <RuxTableCell style={{textAlign: "center"}}>
            <RuxCheckbox checked/>
          </RuxTableCell>
          <RuxTableCell>
            <RuxStatus status="caution" />
          </RuxTableCell>

          <RuxTableCell>Black FEP 121 - Offline</RuxTableCell>
          <RuxTableCell>Hardware</RuxTableCell>
          <RuxTableCell>15:59:57</RuxTableCell>
        </RuxTableRow>

      </RuxTableBody>
    </RuxTable>
  );
};

export default AlertsList;
