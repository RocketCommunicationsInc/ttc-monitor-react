import {
  RuxTable,
  RuxTableHeader,
  RuxTableHeaderRow,
  RuxTableHeaderCell,
  RuxTableRow,
  RuxTableCell,
  RuxTableBody,
} from "@astrouxds/react";
import type { rowDataObject } from "../../Types/types";

//const styles = {
  // cutOffSpaceBar: {
  //   height: "2.5rem",
  //   width: "2rem",
  //   backgroundColor: "var(--gsb-color-background)",
  //   position: "fixed" as "fixed",
  //   left: "97.6%",
  // },
//};

const constellationDataItem = {
  Status: 19999999,
  Satellite: "000011111",
  "Next Pass": 450,
  AOS: "Full",
  LOS: "2020 158 01:23:45:678",
  "Ground Station": "OBTYPE_5",
  Azimuth: 150,
  Elevation: 3500,
  State: 7500,
  Actions: 100,
};

const fixtureData = Array(15).fill(constellationDataItem);

const CostellationList = () => {
  return (
    <RuxTable>
      <RuxTableHeader>
        <RuxTableHeaderRow>
          {Object.keys(fixtureData[0]).map((key) => (
            <RuxTableHeaderCell>{key}</RuxTableHeaderCell>
          ))}
        </RuxTableHeaderRow>
      </RuxTableHeader>
      <RuxTableBody>
        {fixtureData.map((dataObj: rowDataObject) => (
          <RuxTableRow>
            {Object.values(dataObj).map((value) => (
              <RuxTableCell>{value}</RuxTableCell>
            ))}
          </RuxTableRow>
        ))}
      </RuxTableBody>
    </RuxTable>
  );
};

export default CostellationList;
